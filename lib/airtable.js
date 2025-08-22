import Airtable from "airtable";

// Sample data for when Airtable is not configured
const sampleCars = [
  {
    id: "sample1",
    Nom: "BMW Série 3 2020",
    Prix: 25000,
    Caractéristiques: "• Moteur : 2.0L Turbo\n• Transmission : Automatique\n• Kilométrage : 45 000 km\n• Couleur : Noir métallisé\n• Climatisation automatique\n• GPS intégré\n• Sièges en cuir\n• Système de navigation",
    Photos: [
      { url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop" },
      { url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop" }
    ]
  },
  {
    id: "sample2", 
    Nom: "Toyota Corolla 2019",
    Prix: 18000,
    Caractéristiques: "• Moteur : 1.8L Hybride\n• Transmission : CVT\n• Kilométrage : 32 000 km\n• Couleur : Blanc perle\n• Économique en carburant\n• Garantie constructeur\n• Caméra de recul\n• Bluetooth",
    Photos: [
      { url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop" },
      { url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop" }
    ]
  },
  {
    id: "sample3",
    Nom: "Mercedes Classe A 2021", 
    Prix: 32000,
    Caractéristiques: "• Moteur : 1.3L Turbo\n• Transmission : Automatique 7G\n• Kilométrage : 28 000 km\n• Couleur : Gris cosmos\n• Écran tactile 10.25\"\n• Pack AMG\n• Toit panoramique\n• Assistance au stationnement",
    Photos: [
      { url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop" },
      { url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500&h=300&fit=crop" }
    ]
  }
];

export async function getCars() {
  // Check if Airtable is configured
  if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || !process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
    console.log("🔄 Airtable not configured, using sample data");
    return sampleCars;
  }

  try {
    const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY })
      .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
    
    const records = await base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE).select({}).all();
    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("❌ Airtable connection failed:", error.message);
    console.log("🔄 Falling back to sample data");
    return sampleCars;
  }
}
