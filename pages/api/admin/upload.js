import { IncomingForm } from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: { bodyParser: false },
};

function verifyAuth(req) {
  const authCookie = req.cookies['admin-auth'];
  return authCookie ? true : false;
}

export default async function handler(req, res) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
  // Required GitHub env vars
  if (!process.env.GH_TOKEN || !process.env.GH_REPO) {
    return res.status(500).json({ message: 'Configuration GitHub manquante (GH_TOKEN, GH_REPO)' });
  }

  const form = new IncomingForm({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: 'Erreur de parsing du formulaire', error: err.message });
    }
    try {
      const allFiles = Object.values(files).flatMap((f) => (Array.isArray(f) ? f : [f]));

      const branch = process.env.GH_BRANCH || 'main';
      const basePath = (process.env.GH_PATH || 'uploads').replace(/^\/+|\/+$/g, '');
      const repo = process.env.GH_REPO; // format: owner/repo

      const sanitize = (name) => {
        return name
          .toLowerCase()
          .replace(/[^a-z0-9._-]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^[-.]+|[-.]+$/g, '');
      };

      // Upload a single file to GitHub with retry on 409 conflict
      const uploadWithRetry = async (file, maxRetries = 3) => {
        const buf = await fs.readFile(file.filepath);
        const b64 = Buffer.from(buf).toString('base64');
        const original = file.originalFilename || 'file';
        const extMatch = original.match(/\.[a-zA-Z0-9]+$/);
        const ext = extMatch ? extMatch[0] : '';
        const baseName = sanitize(original.replace(/\.[^.]+$/, '')) || 'image';

        let attempt = 0;
        while (attempt <= maxRetries) {
          const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          const filename = `${unique}-${baseName}${ext}`;
          const relPath = basePath ? `${basePath}/${filename}` : filename;

          const apiUrl = `https://api.github.com/repos/${repo}/contents/${relPath}`;
          const body = {
            message: `Upload ${filename}`,
            content: b64,
            branch,
          };
          if (process.env.GH_COMMITTER_NAME && process.env.GH_COMMITTER_EMAIL) {
            body.committer = {
              name: process.env.GH_COMMITTER_NAME,
              email: process.env.GH_COMMITTER_EMAIL,
            };
          }

          const resp = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${process.env.GH_TOKEN}`,
              Accept: 'application/vnd.github+json',
              'Content-Type': 'application/json',
              'X-GitHub-Api-Version': '2022-11-28',
            },
            body: JSON.stringify(body),
          });

          if (resp.ok) {
            // Return jsDelivr CDN URL
            const cdnUrl = `https://cdn.jsdelivr.net/gh/${repo}@${branch}/${relPath}`;
            return cdnUrl;
          }

          // Handle 409 conflict: regenerate a new filename and retry
          if (resp.status === 409 && attempt < maxRetries) {
            attempt += 1;
            continue;
          }

          const t = await resp.text();
          throw new Error(`GitHub upload failed: ${resp.status} ${t}`);
        }

        throw new Error('GitHub upload failed after retries');
      };

      const uploads = await Promise.all(
        allFiles.map((file) => uploadWithRetry(file))
      );

      const urls = uploads.filter(Boolean);
      return res.status(200).json({ urls });
    } catch (e) {
      return res.status(500).json({ message: 'Erreur upload GitHub', error: e.message });
    }
  });
}
