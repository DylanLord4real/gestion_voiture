// API route pour la vérification Google Search Console
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Retourne le meta tag de vérification Google
  // Remplacez 'YOUR_GOOGLE_VERIFICATION_CODE' par votre code de vérification réel
  const verificationCode = process.env.GOOGLE_VERIFICATION_CODE || 'YOUR_GOOGLE_VERIFICATION_CODE';
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="google-site-verification" content="${verificationCode}" />
      <title>Google Site Verification - Rahico Auto</title>
    </head>
    <body>
      <h1>Google Site Verification</h1>
      <p>Cette page est utilisée pour la vérification Google Search Console de Rahico Auto.</p>
    </body>
    </html>
  `);
}
