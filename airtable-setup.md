# Configuration Airtable pour le Catalogue de Voitures

## 1. Créer la base Airtable

1. Aller sur [airtable.com](https://airtable.com)
2. Créer une nouvelle base nommée `CatalogueVoitures`
3. Renommer la table par défaut en `Voitures`

## 2. Structure de la table "Voitures"

Créer les colonnes suivantes dans cet ordre :

| Nom de la colonne | Type de champ | Description |
|-------------------|---------------|-------------|
| **Nom** | Single line text | Nom/modèle de la voiture |
| **Prix** | Number | Prix en euros (format: 15000) |
| **Caractéristiques** | Long text | Description détaillée du véhicule |
| **Photos** | Attachment | Images de la voiture |

## 3. Exemple de données de test

| Nom | Prix | Caractéristiques | Photos |
|-----|------|------------------|--------|
| BMW Série 3 2020 | 25000 | • Moteur : 2.0L Turbo\n• Transmission : Automatique\n• Kilométrage : 45 000 km\n• Couleur : Noir métallisé\n• Climatisation automatique\n• GPS intégré | [Ajouter 2-3 photos] |
| Toyota Corolla 2019 | 18000 | • Moteur : 1.8L Hybride\n• Transmission : CVT\n• Kilométrage : 32 000 km\n• Couleur : Blanc perle\n• Économique en carburant\n• Garantie constructeur | [Ajouter 2-3 photos] |
| Mercedes Classe A 2021 | 32000 | • Moteur : 1.3L Turbo\n• Transmission : Automatique 7G\n• Kilométrage : 28 000 km\n• Couleur : Gris cosmos\n• Écran tactile 10.25"\n• Pack AMG | [Ajouter 2-3 photos] |

## 4. Récupérer le jeton d'accès personnel (PAT)

⚠️ **Important** : Les clés API Airtable ne sont plus supportées depuis février 2024. Utilisez maintenant les jetons d'accès personnels.

### Étapes pour créer un jeton d'accès personnel :

1. **Aller sur Airtable** : Connectez-vous à votre compte [airtable.com](https://airtable.com)

2. **Accéder au Developer Hub** :
   - Cliquez sur votre photo de profil (coin supérieur droit)
   - Sélectionnez **"Developer Hub"**

3. **Créer un nouveau jeton** :
   - Cliquez sur **"Create new token"**
   - Donnez un nom à votre jeton : `Catalogue Voitures`
   - Définissez une durée d'expiration (recommandé : 1 an)

4. **Configurer les permissions** :
   - **Scopes** : Sélectionnez `data.records:read`
   - **Access** : Sélectionnez votre base `CatalogueVoitures`

5. **Générer et copier le jeton** :
   - Cliquez sur **"Create token"**
   - **Copiez immédiatement le jeton** (il ne sera plus affiché)
   - Format : `patXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### Récupérer l'ID de la base :

1. Ouvrez votre base `CatalogueVoitures` dans Airtable
2. L'URL ressemble à : `https://airtable.com/appXXXXXXXXXXXXXX/...`
3. L'ID de la base est la partie `appXXXXXXXXXXXXXX`

## 5. Mettre à jour .env.local

Remplacer les valeurs dans `.env.local` avec votre jeton d'accès personnel :

```env
AIRTABLE_API_KEY=patXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE=Voitures
WHATSAPP_NUMBER=22507XXXXXXXX
```

⚠️ **Attention** : 
- Utilisez le jeton d'accès personnel (PAT) qui commence par `pat`
- Ne partagez jamais votre jeton avec personne
- Gardez le fichier `.env.local` privé (il est déjà dans `.gitignore`)

## 6. Test de la connexion

Une fois configuré, redémarrer le serveur de développement :
```bash
npm run dev
```

Le site devrait maintenant afficher vos voitures depuis Airtable !
