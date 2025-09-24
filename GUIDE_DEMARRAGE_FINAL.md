# 🚀 GUIDE DE DÉMARRAGE RAPIDE - KARIMA

## 📋 Vue d'ensemble
Site web Karima avec gestion de contenu dynamique via base de données.

## 🛠️ Technologies
- **Backend**: .NET 8 + Entity Framework + SQL Server
- **Frontend**: React + TypeScript + Vite
- **Base de données**: SQL Server

## 🚀 Démarrage rapide

### 1. Base de données
```sql
-- Exécuter le script complet
karima-complete-database.sql
```

### 2. Backend API
```powershell
cd api
dotnet run
```
**URL**: http://localhost:5000

### 3. Frontend Web
```powershell
cd web
npm install
npm run dev
```
**URL**: http://localhost:5173

## 🔑 Accès admin
- **URL**: http://localhost:5173/account
- **Email**: admin@karima.fr
- **Mot de passe**: admin123

## 📁 Structure du projet
```
karima/
├── api/                    # Backend .NET
├── web/                    # Frontend React
├── karima-complete-database.sql  # Script DB complet
└── GUIDE_DEMARRAGE_FINAL.md      # Ce guide
```

## ✨ Fonctionnalités
- ✅ Pages dynamiques (Accueil, Services, À propos, Blog, Contact)
- ✅ Gestion de contenu via interface admin
- ✅ Système de sections par catégorie
- ✅ Upload et gestion d'images
- ✅ Formulaire de contact
- ✅ Design responsive

## 🎯 Pages disponibles
- **Accueil**: http://localhost:5173/
- **Services**: http://localhost:5173/services
- **À propos**: http://localhost:5173/about
- **Blog**: http://localhost:5173/blog
- **Contact**: http://localhost:5173/contact
- **Admin**: http://localhost:5173/account

## 🔧 Gestion du contenu
Tout le contenu est géré via l'interface admin :
- Sections par catégorie (Accueil, Services, À propos, Blog, Contact, Footer)
- Édition en temps réel
- Upload d'images
- Gestion des médias

## 📊 Base de données
- **Tables principales**: Users, Sections, ServiceContents, MediaFiles, ContactRequests, Todos
- **Script complet**: `karima-complete-database.sql`
- **Données de démonstration** incluses

---
**Projet Karima - Système de gestion de contenu dynamique** 🎉
