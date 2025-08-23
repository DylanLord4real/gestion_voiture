import Airtable from 'airtable';

// Vérifier l'authentification admin
function verifyAuth(req) {
  const authCookie = req.cookies['admin-auth'];
  return authCookie ? true : false;
}

export default async function handler(req, res) {
  // Vérifier l'authentification
  if (!verifyAuth(req)) {
    return res.status(401).json({ message: 'Non autorisé' });
  }

  // Configuration Airtable
  if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || !process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
    return res.status(500).json({ message: 'Configuration Airtable manquante' });
  }

  const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY })
    .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
  
  const table = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Voitures');

  try {
    switch (req.method) {
      case 'GET':
        // Récupérer toutes les voitures
        const records = await table.select({}).all();
        const cars = records.map(record => ({
          id: record.id,
          ...record.fields
        }));
        return res.status(200).json(cars);

      case 'POST':
        // Créer une nouvelle voiture
        const newRecord = await table.create([
          {
            fields: req.body
          }
        ]);
        return res.status(201).json({
          id: newRecord[0].id,
          ...newRecord[0].fields
        });

      case 'PUT':
        // Mettre à jour une voiture
        const { id, ...updateData } = req.body;
        const updatedRecord = await table.update([
          {
            id: id,
            fields: updateData
          }
        ]);
        return res.status(200).json({
          id: updatedRecord[0].id,
          ...updatedRecord[0].fields
        });

      case 'DELETE':
        // Supprimer une voiture
        const { id: deleteId } = req.body;
        await table.destroy([deleteId]);
        return res.status(200).json({ message: 'Voiture supprimée avec succès' });

      default:
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur API Airtable:', error);
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
}
