# Karima Web - Frontend React + TypeScript + Vite

Interface utilisateur moderne développée avec React, TypeScript et Vite pour le site Karima.

## Prérequis

- Node.js 18+ 
- npm ou yarn

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

Le site sera disponible sur `http://localhost:5173`

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # En-tête de navigation
│   ├── Footer.tsx      # Pied de page
│   ├── ContactForm.tsx # Formulaire de contact
│   ├── ServiceCard.tsx # Carte de service
│   └── TodoList.tsx    # Liste des tâches (démo CRUD)
├── pages/              # Pages de l'application
│   ├── Home.tsx        # Page d'accueil
│   ├── Services.tsx    # Page des services
│   ├── About.tsx       # Page à propos
│   ├── Blog.tsx        # Page du blog
│   ├── BlogPost.tsx    # Page d'article de blog
│   └── Contact.tsx     # Page de contact
├── lib/                # Utilitaires et API
│   └── api.ts          # Fonctions d'API
├── App.tsx             # Composant principal
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux et design system
```

## Fonctionnalités

- **Design System** : Palette de couleurs professionnelle et cohérente
- **Responsive** : Interface adaptative pour tous les écrans
- **Navigation** : Routing avec React Router
- **API Integration** : Communication avec le backend .NET
- **Formulaires** : Validation côté client et soumission
- **Démo CRUD** : Gestion des tâches avec persistance en base

## Design System

### Couleurs
- **Primaire** : #1F4E79 (bleu confiance)
- **Secondaire** : #9FB3C8 (bleu clair)
- **Accent** : #F3C614 (jaune doré)
- **Fond** : #F8FAFC (gris très clair)
- **Texte** : #0F172A (gris foncé)

### Typographie
- **Police** : Inter (Google Fonts)
- **Tailles** : Système d'échelle cohérent
- **Poids** : 300, 400, 500, 600, 700

### Composants
- Boutons avec états (primary, secondary, outline, accent)
- Cartes avec ombres et coins arrondis
- Formulaires avec validation
- Navigation responsive

## Configuration

Le proxy API est configuré dans `vite.config.ts` pour rediriger les appels `/api` vers le backend sur le port 5000.

## Déploiement

Pour construire l'application pour la production :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.
