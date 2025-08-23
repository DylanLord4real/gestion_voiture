import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Vérification des identifiants (à sécuriser avec des variables d'environnement)
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'rahico2024';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Créer un token simple (en production, utiliser JWT)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    
    // Définir le cookie d'authentification
    const cookie = serialize('admin-auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ message: 'Identifiants incorrects' });
}
