# Guide Officiel de Configuration Meta Graph API & Déploiement Netlify
## Écoles « Le Berceau des 3S » (Conakry, Guinée)

Ce guide détaille pas à pas la configuration de la synchronisation automatique des publications et vidéos publiques de la Page Facebook officielle des **Écoles Le Berceau des 3S**, ainsi que le déploiement sur Netlify.

---

## 1. Vue d'Ensemble de l'Architecture Sécurisée

```
[Navigateur Visiteur]
        │
        ▼ (Appel public sans jeton)
[/api/facebook/posts]
        │
        ▼ (Redirection Netlify ou Middleware local)
[Netlify Serverless Function (facebook-posts.ts)]
        │  lit process.env.META_ACCESS_TOKEN & META_PAGE_ID
        │  met en cache les réponses (15 minutes)
        ▼
[Meta Graph API (https://graph.facebook.com/v20.0/...)]
```

> **Sécurité absolue** : Le jeton d'accès secret et l'ID de l'application ne sont **jamais** envoyés au navigateur des visiteurs ni stockés dans le code source public.

---

## 2. Étape par Étape : Configuration dans Meta for Developers

### Étape 2.1 : Créer ou Sélectionner une Application Meta
1. Rendez-vous sur le portail officiel : [developers.facebook.com](https://developers.facebook.com/).
2. Connectez-vous avec le compte administrateur de la Page Facebook de l'école.
3. Cliquez sur **Mes applications** > **Créer une application**.
4. Type d'application : sélectionnez **Entreprise (Business)** ou **Autre**.
5. Renseignez le nom d'affichage (ex. : `Portail Web Le Berceau des 3S`) et votre e-mail de contact.

### Étape 2.2 : Ajouter le Produit « Graph API » et Permissions
1. Dans le tableau de bord de l'application, activez le produit **API Graph** ou **Connexion Facebook pour les entreprises**.
2. Les autorisations (scopes) officiellement requises pour lire le flux public de votre propre page sont :
   - `pages_show_list` : permet de lister les pages que vous administrez.
   - `pages_read_engagement` : permet de lire les interactions et publications de la page.
   - `pages_read_user_content` : permet de lire le contenu textuel et multimédia des publications créées par la page.

### Étape 2.3 : Obtenir l'Identifiant (Page ID) de la Page Facebook
1. Sur Facebook, ouvrez la page officielle des Écoles Le Berceau des 3S.
2. Allez dans l'onglet **À propos** > **Transparence de la Page** > **Identifiant de la Page** (un numéro à 15 ou 16 chiffres, ex. : `102938475610293`).
3. Vous pouvez également le récupérer via l'Explorateur Graph API : `GET /me/accounts`.

### Étape 2.4 : Générer un Page Access Token Permanent (Never Expire)
Par défaut, un jeton utilisateur expire sous 1 ou 2 heures. Pour le site web de l'école, vous devez générer un **Page Access Token de longue durée** :
1. Dans Meta for Developers, ouvrez les **Outils** > **Explorateur Graph API** (*Graph API Explorer*).
2. Sélectionnez votre application dans la liste déroulante.
3. Dans la liste **Utilisateur ou Page**, sélectionnez votre **Page Le Berceau des 3S** (et non votre profil personnel).
4. Cochez les permissions `pages_read_engagement` et `pages_read_user_content`.
5. Cliquez sur **Générer le jeton d'accès** (*Generate Access Token*) et acceptez la demande d'autorisation.
6. Copiez ce jeton temporaire et ouvrez le **Débogueur de jeton d'accès** (*Access Token Debugger*) : [developers.facebook.com/tools/debug/accesstoken](https://developers.facebook.com/tools/debug/accesstoken).
7. Collez le jeton et cliquez sur **Déboguer**, puis en bas sur **Prolonger le jeton d'accès** (*Extend Access Token*). Vous obtiendrez un jeton de 60 jours ou permanent associé à la Page.

---

## 3. Configuration des Variables d'Environnement sur Netlify

Dans le tableau de bord Netlify de votre site :
1. Allez dans **Site configuration** > **Environment variables**.
2. Ajoutez les variables suivantes :

| Variable | Description | Exemple |
|---|---|---|
| `VITE_FACEBOOK_PAGE_URL` | URL exacte de la page Facebook officielle | `https://www.facebook.com/LeBerceauDes3S` |
| `META_PAGE_ID` | L'ID numérique de la Page Facebook | `102938475610293` |
| `META_ACCESS_TOKEN` | Le Page Access Token longue durée | `EAAB...` (longue chaîne) |
| `META_APP_SECRET` | *(Optionnel)* Clé secrète de l'application Meta | *(visible dans Paramètres > Général)* |
| `META_VERIFY_TOKEN` | *(Optionnel pour Webhooks)* Jeton arbitraire | `leberceaudes3s_secret_webhook_token` |

3. Déclenchez un redéploiement sur Netlify (**Deploys** > **Trigger deploy** > **Deploy site**) pour prendre en compte les variables.

---

## 4. Test et Vérification

### 4.1 Tester l'API du site
Une fois le site déployé (ou en local sur `http://localhost:3000`), accédez à :
```
https://votre-site.netlify.app/api/facebook/posts
```
- **Si les clés ne sont pas encore mises** : l'API répond avec le statut `"unconfigured"`. Le site affiche alors le mode autonome élégant avec le plugin officiel Facebook Page Plugin et le bouton direct vers la page.
- **Si les clés sont valides** : l'API répond avec le statut `"ok"`, le tableau des publications normalisées et la mise en cache active.

### 4.2 En cas d'Erreur (Diagnostics fréquents)
- **Erreur code `190`** : *Access token has expired*.
  - *Solution* : Générez un nouveau Page Access Token dans Graph API Explorer et mettez à jour `META_ACCESS_TOKEN` sur Netlify.
- **Erreur code `200` ou `10`** : *Permissions error*.
  - *Solution* : Assurez-vous que l'application Meta dispose bien de `pages_read_engagement` et que votre compte est administrateur de la page.
- **Erreur code `4` ou `17`** : *Rate limit reached*.
  - *Solution* : Notre fonction intègre déjà un cache de 15 minutes. Évitez les rafraîchissements forcés répétés.

---

## 5. Webhooks Meta (Optionnel pour notification instantanée)

Si vous souhaitez que Meta notifie automatiquement votre site lors d'une nouvelle publication :
1. Dans Meta for Developers > Produits > **Webhooks**.
2. Sélectionnez l'objet **Page**.
3. Cliquez sur **S'abonner à ce webhook**.
4. URL de rappel (*Callback URL*) :
   `https://votre-site.netlify.app/api/facebook/webhook`
5. Jeton de vérification (*Verify Token*) :
   Indiquez la même valeur que `META_VERIFY_TOKEN` (ex. `leberceaudes3s_secret_webhook_token`).
6. Sélectionnez le champ **feed**.
7. Validez. Notre fonction `netlify/functions/facebook-webhook.ts` répond automatiquement au challenge Meta.

---

## 6. Procédure de Révocation d'Urgence

Si vous suspectez qu'un jeton a été compromis :
1. Rendez-vous dans **Meta for Developers** > **Paramètres de l'application** > **Général**.
2. Cliquez sur **Réinitialiser le secret d'application**.
3. Dans **Outils** > **Débogueur de jeton**, invalidez le jeton d'accès.
4. Mettez à jour la variable `META_ACCESS_TOKEN` sur Netlify et redéployez.

---

## 7. Instructions de Publication sur Netlify (Gratuit)

### Méthode A : Connexion GitHub (Recommandée)
1. Poussez le dépôt sur votre compte GitHub (ex. `le-berceau-des-3s`).
2. Connectez-vous sur [netlify.com](https://www.netlify.com/).
3. Cliquez sur **Add new site** > **Import an existing project** > **GitHub**.
4. Choisissez le dépôt.
5. Paramètres préconfigurés grâce au fichier `netlify.toml` déjà inclus :
   - Build command : `npm run build`
   - Publish directory : `dist`
   - Functions directory : `netlify/functions`
6. Renseignez les variables d'environnement (Section 3).
7. Cliquez sur **Deploy site**.

### Méthode B : Déploiement Direct (Drag & Drop)
1. Exécutez `npm run build` dans votre terminal.
2. Le dossier `dist` est généré.
3. Glissez-déposez le dossier `dist` dans l'interface Netlify Drop ([app.netlify.com/drop](https://app.netlify.com/drop)).
