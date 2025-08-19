# 🚗 Catalogue de Voitures - Next.js + Airtable + WhatsApp

Site web de catalogue de voitures avec gestion via Airtable et intégration WhatsApp pour les contacts.

## 🚀 Fonctionnalités

- **Catalogue de voitures** : Affichage en grille avec photos, noms et prix
- **Pages détaillées** : Caractéristiques complètes avec galerie photos
- **Contact WhatsApp** : Bouton direct pour contacter le vendeur
- **Administration simple** : Gestion des voitures via Airtable
- **Responsive** : Interface adaptée mobile et desktop

## 📋 Prérequis

- Node.js (version 16 ou plus récente)
- Un compte Airtable
- Un numéro WhatsApp Business

## ⚙️ Installation

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement** :
   Modifier le fichier `.env.local` avec vos vraies valeurs :
   ```env
   AIRTABLE_API_KEY=your_actual_api_key
   AIRTABLE_BASE_ID=your_actual_base_id
   AIRTABLE_TABLE=Voitures
   WHATSAPP_NUMBER=your_whatsapp_number
   ```

3. **Configurer Airtable** :
   - Créer une base nommée `CatalogueVoitures`
   - Créer une table `Voitures` avec les colonnes :
     - **Nom** (Single line text)
     - **Prix** (Number)
     - **Caractéristiques** (Long text)
     - **Photos** (Attachment)

## 🏃‍♂️ Lancement

```bash
# Mode développement
npm run dev

# Build pour production
npm run build
npm start
```

Le site sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
catalogue-voitures/
├── lib/
│   └── airtable.js          # Connexion et requêtes Airtable
├── pages/
│   ├── _app.js              # Configuration globale Next.js
│   ├── index.js             # Page d'accueil (catalogue)
│   └── voiture/
│       └── [id].js          # Page détails d'une voiture
├── styles/
│   └── globals.css          # Styles Tailwind CSS
├── .env.local               # Variables d'environnement
├── next.config.js           # Configuration Next.js
├── tailwind.config.js       # Configuration Tailwind
└── package.json
```

## 🎨 Personnalisation

- **Styles** : Modifier les classes Tailwind dans les composants
- **Couleurs** : Ajuster les couleurs dans `tailwind.config.js`
- **Champs Airtable** : Ajouter de nouveaux champs dans la table et les utiliser dans les pages

## 🚀 Déploiement

### Vercel (recommandé)

1. Pousser le code sur GitHub
2. Connecter le repo à Vercel
3. Ajouter les variables d'environnement dans Vercel
4. Déployer automatiquement

### Autres plateformes

Le projet est compatible avec toutes les plateformes supportant Next.js :
- Netlify
- Railway
- Heroku
- AWS Amplify

## 📱 Utilisation

### Pour l'administrateur
- Ajouter une voiture : Créer une nouvelle ligne dans Airtable
- Modifier : Éditer directement dans Airtable
- Supprimer : Supprimer la ligne dans Airtable

### Pour les visiteurs
- Parcourir le catalogue sur la page d'accueil
- Cliquer sur une voiture pour voir les détails
- Utiliser le bouton WhatsApp pour contacter le vendeur

## 🔧 Évolutions possibles

- [ ] Filtrage par marque, prix, année
- [ ] Recherche textuelle
- [ ] Système de favoris
- [ ] Formulaire de contact
- [ ] Comparateur de voitures
- [ ] Pagination pour de gros catalogues

## 📞 Support

Pour toute question ou problème, consultez la documentation Next.js et Airtable ou créez une issue sur le repository.
