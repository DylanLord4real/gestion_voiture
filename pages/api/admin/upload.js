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
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    return res.status(500).json({ message: 'Configuration GitHub manquante (GITHUB_TOKEN, GITHUB_REPO)' });
  }

  const form = new IncomingForm({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: 'Erreur de parsing du formulaire', error: err.message });
    }
    try {
      const allFiles = Object.values(files).flatMap((f) => (Array.isArray(f) ? f : [f]));

      const branch = process.env.GITHUB_BRANCH || 'main';
      const basePath = (process.env.GITHUB_PATH || 'uploads').replace(/^\/+|\/+$/g, '');
      const repo = process.env.GITHUB_REPO; // format: owner/repo

      const sanitize = (name) => {
        return name
          .toLowerCase()
          .replace(/[^a-z0-9._-]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^[-.]+|[-.]+$/g, '');
      };

      const uploads = await Promise.all(
        allFiles.map(async (file) => {
          const buf = await fs.readFile(file.filepath);
          const b64 = Buffer.from(buf).toString('base64');
          const original = file.originalFilename || 'file';
          const extMatch = original.match(/\.[a-zA-Z0-9]+$/);
          const ext = extMatch ? extMatch[0] : '';
          const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          const filename = `${unique}-${sanitize(original.replace(/\.[^.]+$/, ''))}${ext}`;
          const relPath = basePath ? `${basePath}/${filename}` : filename;

          const apiUrl = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(relPath)}`;
          const body = {
            message: `Upload ${filename}`,
            content: b64,
            branch,
          };
          const resp = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              Accept: 'application/vnd.github+json',
              'Content-Type': 'application/json',
              'X-GitHub-Api-Version': '2022-11-28',
            },
            body: JSON.stringify(body),
          });
          if (!resp.ok) {
            const t = await resp.text();
            throw new Error(`GitHub upload failed: ${resp.status} ${t}`);
          }
          // Return jsDelivr CDN URL
          const cdnUrl = `https://cdn.jsdelivr.net/gh/${repo}@${branch}/${relPath}`;
          return cdnUrl;
        })
      );

      const urls = uploads.filter(Boolean);
      return res.status(200).json({ urls });
    } catch (e) {
      return res.status(500).json({ message: 'Erreur upload GitHub', error: e.message });
    }
  });
}
