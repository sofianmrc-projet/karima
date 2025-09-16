# 🚀 Guide d'Installation Rapide - Projet Karima

## ⚡ Installation en 5 minutes

### 1. Prérequis
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads) (ou LocalDB)
- [Git](https://git-scm.com/)

### 2. Cloner le projet
```bash
git clone [url-du-repo]
cd karima
```

### 3. Configuration Backend
```bash
cd api

# Restaurer les packages
dotnet restore

# Créer la base de données
dotnet ef database update

# Démarrer l'API
dotnet run
```
✅ API disponible sur `http://localhost:5000`
✅ Swagger sur `http://localhost:5000/swagger`

### 4. Configuration Frontend
```bash
cd web

# Installer les dépendances
npm install

# Démarrer l'application
npm run dev
```
✅ Application disponible sur `http://localhost:5173`

### 5. Connexion Admin
- **URL** : `http://localhost:5173/account`
- **Email** : `admin@karima.com`
- **Mot de passe** : `admin123`

## 🎯 Fonctionnalités disponibles

### ✅ Authentification
- Connexion sécurisée avec JWT
- Gestion des sessions
- Déconnexion automatique

### ✅ Gestion du contenu
- Édition des textes de la page Services
- Sauvegarde en temps réel
- Historique des modifications

### ✅ Gestion des médias
- Upload d'images (JPG, PNG, GIF, WebP, SVG)
- Organisation par catégories
- Métadonnées (alt text, description)

## 🔧 Configuration avancée

### Variables d'environnement
```bash
# Backend (api/appsettings.json)
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=KarimaDb;Trusted_Connection=true;"
  },
  "Jwt": {
    "Key": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!",
    "Issuer": "Karima.Api",
    "Audience": "Karima.Client"
  }
}
```

### Base de données
```bash
# Créer une migration
dotnet ef migrations add NomDeLaMigration

# Appliquer les migrations
dotnet ef database update

# Supprimer la base de données
dotnet ef database drop
```

## 🐛 Résolution des problèmes

### Erreur de connexion à la base de données
```bash
# Vérifier que SQL Server est démarré
# Ou utiliser LocalDB
dotnet ef database update --connection "Server=(localdb)\\mssqllocaldb;Database=KarimaDb;Trusted_Connection=true;"
```

### Erreur CORS
Vérifier que l'API est démarrée sur le port 5000 et le frontend sur 5173.

### Erreur d'upload de fichiers
Créer manuellement le dossier `api/wwwroot/uploads/media/`

## 📚 Documentation complète

Pour la documentation technique complète, voir `DOCUMENTATION_TECHNIQUE_KARIMA.md`

## 🆘 Support

En cas de problème :
1. Vérifier les logs dans la console
2. Consulter la documentation technique
3. Vérifier que tous les prérequis sont installés
4. Redémarrer les services

---

*Guide généré le $(Get-Date) - Projet Karima v1.0*
