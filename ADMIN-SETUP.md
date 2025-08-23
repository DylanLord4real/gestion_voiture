# Configuration de l'Administration RAHICO PARC AUTO

## 🔧 Accès en développement local

### URL d'accès local
En développement local, vous pouvez accéder à l'administration via :

```
http://localhost:3000/admin/login
```

### Identifiants par défaut
- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `rahico2024`

### Démarrage en local
```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# L'application sera accessible sur http://localhost:3000
```

## 🌐 Configuration du sous-domaine sur Vercel

### Étape 1 : Déploiement initial
1. Connectez votre repository GitHub à Vercel
2. Déployez votre application normalement
3. Notez l'URL principale : `https://rahico-parc-auto.vercel.app`

### Étape 2 : Configuration des variables d'environnement
Dans le dashboard Vercel, ajoutez ces variables d'environnement :

```env
NEXT_PUBLIC_AIRTABLE_API_KEY=votre_cle_api_airtable
NEXT_PUBLIC_AIRTABLE_BASE_ID=votre_base_id
NEXT_PUBLIC_AIRTABLE_TABLE=Voitures
NEXT_PUBLIC_WHATSAPP_NUMBER=2250707219825
ADMIN_USERNAME=admin
ADMIN_PASSWORD=rahico2024
```

### Étape 3 : Configuration du domaine personnalisé

#### Option A : Domaine personnalisé complet
1. **Acheter un domaine** (ex: `rahico-parc-auto.com`)
2. **Dans Vercel Dashboard** :
   - Aller dans Settings > Domains
   - Ajouter `rahico-parc-auto.com`
   - Ajouter `admin.rahico-parc-auto.com`
3. **Configuration DNS** chez votre registrar :
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   
   Type: CNAME
   Name: admin
   Value: cname.vercel-dns.com
   ```

#### Option B : Sous-domaine Vercel (Recommandé pour les tests)
1. **Dans Vercel Dashboard** :
   - Aller dans Settings > Domains
   - Ajouter `admin-rahico-parc-auto.vercel.app`
2. **Accès direct** :
   - Admin : `https://admin-rahico-parc-auto.vercel.app`
   - Site public : `https://rahico-parc-auto.vercel.app`

### Étape 4 : Configuration du middleware (Déjà fait)
Le fichier `middleware.js` est configuré pour :
- Rediriger `/admin/*` vers le sous-domaine admin
- Gérer l'authentification automatiquement
- Protéger les routes administratives

### Étape 5 : Test de la configuration
1. **Accès public** : `https://rahico-parc-auto.vercel.app`
2. **Accès admin** : `https://admin.rahico-parc-auto.vercel.app/login`
3. **Redirection automatique** : `https://rahico-parc-auto.vercel.app/admin` → redirige vers le sous-domaine

## 🔒 Sécurité

### Changement des identifiants
Pour changer les identifiants admin :
1. **Dans Vercel** : Modifier les variables d'environnement
   - `ADMIN_USERNAME` : nouveau nom d'utilisateur
   - `ADMIN_PASSWORD` : nouveau mot de passe
2. **Redéployer** l'application

### Recommandations de sécurité
- Utilisez des mots de passe forts
- Changez les identifiants par défaut
- Activez l'authentification à deux facteurs sur Vercel
- Surveillez les logs d'accès

## 📱 Fonctionnalités de l'administration

### Dashboard
- Statistiques des véhicules (total, disponibles, vendus)
- Liste complète avec images
- Actions rapides (modifier, supprimer)

### Gestion des véhicules
- **Créer** : Formulaire complet avec tous les champs
- **Modifier** : Édition en place des informations
- **Supprimer** : Avec confirmation de sécurité
- **Statuts** : Disponible, Réservé, Vendu

### Synchronisation Airtable
- Toutes les modifications sont synchronisées en temps réel
- Les données sont immédiatement visibles sur le site public
- Gestion des erreurs et messages de confirmation

## 🚨 Dépannage

### Problème d'accès admin
1. Vérifiez que les variables d'environnement sont correctes
2. Videz le cache du navigateur
3. Vérifiez les logs Vercel pour les erreurs

### Erreur de connexion Airtable
1. Vérifiez la clé API Airtable
2. Confirmez l'ID de la base
3. Vérifiez les permissions de la clé API

### Problème de sous-domaine
1. Attendez la propagation DNS (jusqu'à 24h)
2. Vérifiez la configuration dans Vercel
3. Testez avec l'URL directe Vercel d'abord

## 📞 Support
Pour toute question technique, vérifiez :
1. Les logs Vercel
2. La console du navigateur
3. Les variables d'environnement
4. La configuration DNS

---

**Note** : Cette configuration permet une gestion complète et sécurisée de votre inventaire automobile avec une interface moderne et intuitive.
