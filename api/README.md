# API Karima - Backend .NET 8

API REST développée avec .NET 8, Entity Framework Core et SQL Server.

## Prérequis

- .NET 8 SDK
- SQL Server Developer Edition
- Visual Studio ou VS Code

## Installation

1. Restaurer les packages NuGet :
```bash
dotnet restore
```

2. Créer et appliquer les migrations :
```bash
dotnet ef migrations add Init
dotnet ef database update
```

3. Lancer l'API :
```bash
dotnet run
```

L'API sera disponible sur `http://localhost:5000`

## Endpoints disponibles

### Todos
- `GET /api/todos` - Récupérer tous les todos
- `POST /api/todos` - Créer un nouveau todo
- `PATCH /api/todos/{id}` - Basculer l'état d'un todo
- `DELETE /api/todos/{id}` - Supprimer un todo

### Contact
- `POST /api/contact` - Envoyer une demande de contact

## Base de données

La base de données `KarimaDb` sera créée automatiquement avec les tables :
- `Todos` : Gestion des tâches (démo CRUD)
- `ContactRequests` : Demandes de contact

## Configuration

La chaîne de connexion est configurée dans `appsettings.json` :
```json
"DefaultConnection": "Server=localhost;Database=KarimaDb;Trusted_Connection=True;TrustServerCertificate=True;"
```
