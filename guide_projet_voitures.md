# 🚗 Projet Site Web Catalogue de Voitures (Next.js + Airtable + WhatsApp)

Ce document décrit les étapes pour créer un site web permettant d’afficher des voitures disponibles, de consulter leurs caractéristiques, et de rediriger l’utilisateur vers WhatsApp pour l’achat.  
L’administrateur pourra gérer les voitures via **Airtable** (ajout, suppression, modification, images).

---

## 1. Objectifs du projet
- Afficher toutes les voitures disponibles dans un catalogue.
- Permettre de cliquer sur une voiture pour voir ses détails (prix, caractéristiques, photos).
- Ajouter un bouton d’achat qui redirige vers la messagerie **WhatsApp de l’admin**.
- Fournir une interface simple d’administration (Airtable).
- Déploiement simple, sans backend lourd.

---

## 2. Stack choisie
- **Frontend** : [Next.js](https://nextjs.org/) (hébergé sur [Vercel](https://vercel.com/)).
- **Base de données + Admin** : [Airtable](https://airtable.com/).
- **Stockage des photos** : intégré à Airtable (champ "Attachment").
- **Messagerie** : WhatsApp (lien direct `https://wa.me/<numéro>`).

---

## 3. Pré-requis
- Un compte **GitHub** (pour héberger le code).
- Un compte **Airtable**.
- Un numéro WhatsApp valide.
- Node.js et npm installés en local.

---

## 4. Configuration Airtable
1. Créer une nouvelle base Airtable nommée `CatalogueVoitures`.
2. Créer une table `Voitures` avec les colonnes :
   - **Nom** (Single line text)
   - **Prix** (Number)
   - **Caractéristiques** (Long text)
   - **Photos** (Attachment)
3. Ajouter quelques voitures de test.
4. Récupérer la clé API Airtable :
   - Aller dans **Account > Developer Hub > API key/token**.
   - Copier l’API Key et l’ID de la base.

---

## 5. Initialisation du projet Next.js
1. Créer un projet Next.js :
   ```bash
   npx create-next-app@latest catalogue-voitures
   cd catalogue-voitures
   ```
2. Installer les dépendances nécessaires :
   ```bash
   npm install airtable
   ```
3. Créer un fichier `.env.local` et y mettre :
   ```env
   AIRTABLE_API_KEY=ta_clef_api
   AIRTABLE_BASE_ID=ton_id_de_base
   AIRTABLE_TABLE=Voitures
   WHATSAPP_NUMBER=2250700000000
   ```

---

## 6. Connexion à Airtable
Créer un fichier `lib/airtable.js` :
```js
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

export async function getCars() {
  const records = await base(process.env.AIRTABLE_TABLE).select({}).all();
  return records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
}
```

---

## 7. Pages Next.js
### Page d’accueil (liste des voitures)
Créer `pages/index.js` :
```jsx
import { getCars } from "../lib/airtable";
import Link from "next/link";

export default function Home({ cars }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {cars.map((car) => (
        <div key={car.id} className="border p-4 rounded shadow">
          <h2>{car.Nom}</h2>
          <p>Prix : {car.Prix} €</p>
          {car.Photos && (
            <img src={car.Photos[0].url} alt={car.Nom} className="w-full h-48 object-cover" />
          )}
          <Link href={`/voiture/${car.id}`} className="text-blue-500">
            Voir détails →
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const cars = await getCars();
  return { props: { cars }, revalidate: 60 };
}
```

---

### Page voiture (détails)
Créer `pages/voiture/[id].js` :
```jsx
import { getCars } from "../../lib/airtable";

export default function CarDetails({ car }) {
  return (
    <div className="p-6">
      <h1>{car.Nom}</h1>
      <p>Prix : {car.Prix} €</p>
      <p>{car.Caractéristiques}</p>
      {car.Photos?.map((photo, i) => (
        <img key={i} src={photo.url} alt={car.Nom} className="w-96 h-64 object-cover my-2" />
      ))}

      <a
        href={`https://wa.me/${process.env.WHATSAPP_NUMBER}?text=Bonjour, je suis intéressé par la ${car.Nom}`}
        className="bg-green-500 text-white px-4 py-2 rounded inline-block mt-4"
      >
        Acheter via WhatsApp
      </a>
    </div>
  );
}

export async function getStaticPaths() {
  const cars = await getCars();
  const paths = cars.map((car) => ({ params: { id: car.id } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const cars = await getCars();
  const car = cars.find((c) => c.id === params.id);
  return { props: { car }, revalidate: 60 };
}
```

---

## 8. Déploiement
1. Pousser le projet sur GitHub :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <repo-url>
   git push -u origin main
   ```
2. Aller sur [Vercel](https://vercel.com/), importer le repo.
3. Ajouter les variables d’environnement (`AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, etc.).
4. Déployer 🎉

---

## 9. Utilisation par l’administrateur
- Pour ajouter une voiture : ouvrir Airtable et remplir une nouvelle ligne.
- Pour modifier : éditer directement dans Airtable.
- Pour supprimer : supprimer la ligne → elle disparaîtra automatiquement du site (après refresh/rebuild).

---

## 10. Évolutions possibles
- Filtrage par marque, prix, année.
- Pagination / recherche.
- Ajout d’un mode "favoris".
- Intégration d’un **formulaire de contact** en plus de WhatsApp.

---

✅ Avec ce guide, tu peux mettre en place ton site étape par étape sans backend complexe.
