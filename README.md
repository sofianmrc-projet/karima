# Projet Karima

Site vitrine professionnel avec backend .NET 8 + EF Core et frontend React + TypeScript + Vite.

## Structure du projet

```
karima/
├─ api/                     # .NET 8 + EF Core
│  ├─ Models/Todo.cs
│  ├─ Data/AppDbContext.cs
│  ├─ Program.cs
│  ├─ appsettings.json
│  └─ README.md
├─ web/                     # React + Vite + TS
│  ├─ src/
│  │  ├─ pages/ (Home, Services, About, Blog, BlogPost)
│  │  ├─ components/ (Header, Footer, ContactForm, ServiceCard, etc.)
│  │  ├─ lib/api.ts
│  │  ├─ router.tsx
│  │  ├─ main.tsx, App.tsx
│  ├─ vite.config.ts
│  ├─ .env.development.local
│  └─ README.md
└─ README.md
```

## Installation et démarrage

### Backend (API)
```bash
cd api
dotnet restore
dotnet ef migrations add Init
dotnet ef database update
dotnet run
```
L'API sera disponible sur http://localhost:5000

### Frontend (Web)
```bash
cd web
npm install
npm run dev
```
Le site sera disponible sur http://localhost:5173

## Fonctionnalités

- **Backend** : API REST avec Entity Framework Core et SQL Server
- **Frontend** : Interface React moderne avec TypeScript
- **Design System** : Palette de couleurs professionnelle
- **Pages** : Accueil, Services, À propos, Blog
- **Fonctionnalités** : Formulaire de contact, gestion des todos (démo CRUD)