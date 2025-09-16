# 📚 Documentation Technique Complète - Projet Karima

## Table des Matières

1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Architecture générale](#architecture-générale)
3. [Stack technologique](#stack-technologique)
4. [Configuration de l'environnement](#configuration-de-lenvironnement)
5. [Backend - API .NET 8](#backend---api-net-8)
6. [Frontend - React + TypeScript](#frontend---react--typescript)
7. [Base de données - SQL Server](#base-de-données---sql-server)
8. [Authentification et sécurité](#authentification-et-sécurité)
9. [Gestion des fichiers](#gestion-des-fichiers)
10. [Déploiement](#déploiement)
11. [Troubleshooting](#troubleshooting)
12. [Bonnes pratiques](#bonnes-pratiques)

---

## Vue d'ensemble du projet

### 🎯 Objectif
Le projet Karima est une application web complète permettant la gestion d'un site vitrine avec un espace d'administration pour :
- Modifier le contenu des pages (notamment la page Services)
- Uploader et gérer des images
- Authentifier les administrateurs

### 🏗️ Structure du projet
```
karima/
├── api/                    # Backend .NET 8 Web API
│   ├── Controllers/        # Contrôleurs API
│   ├── Models/            # Modèles de données
│   ├── Data/              # Contexte Entity Framework
│   ├── Migrations/        # Migrations de base de données
│   └── Swagger/           # Configuration Swagger
└── web/                   # Frontend React + TypeScript
    ├── src/
    │   ├── components/    # Composants React
    │   ├── pages/         # Pages de l'application
    │   ├── lib/           # Services et utilitaires
    │   └── styles/        # Styles CSS
    └── public/            # Fichiers statiques
```

---

## Architecture générale

### 🔄 Flux de données
```
[Frontend React] ←→ [API .NET 8] ←→ [SQL Server]
       ↓
[Fichiers statiques] ←→ [Dossier uploads/]
```

### 📡 Communication
- **Frontend → API** : Requêtes HTTP (GET, POST, PUT, DELETE)
- **API → Base de données** : Entity Framework Core
- **API → Fichiers** : Stockage local sur le serveur

---

## Stack technologique

### 🖥️ Backend
- **.NET 8** : Framework principal
- **ASP.NET Core Web API** : Création d'API REST
- **Entity Framework Core** : ORM pour la base de données
- **SQL Server** : Base de données relationnelle
- **JWT Bearer** : Authentification par tokens
- **BCrypt** : Hachage des mots de passe
- **Swagger/OpenAPI** : Documentation automatique

### 🌐 Frontend
- **React 18** : Bibliothèque UI
- **TypeScript** : Langage typé
- **Vite** : Build tool et serveur de développement
- **React Router** : Navigation côté client
- **Fetch API** : Communication avec l'API

### 🗄️ Base de données
- **SQL Server** : SGBD principal
- **Migrations EF Core** : Versioning du schéma
- **Relations** : Clés étrangères et contraintes

---

## Configuration de l'environnement

### 📋 Prérequis
1. **Visual Studio 2022** ou **VS Code** avec extension C#
2. **.NET 8 SDK**
3. **SQL Server** (LocalDB ou Express)
4. **Node.js 18+** et **npm**
5. **Git** pour le contrôle de version

### ⚙️ Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd karima

# Backend
cd api
dotnet restore
dotnet ef database update

# Frontend
cd ../web
npm install
```

---

## Backend - API .NET 8

### 🏗️ Structure des contrôleurs

#### 1. AuthController - Authentification
```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    // POST /api/auth/login
    // POST /api/auth/logout
    // GET /api/auth/me
}
```

**Fonctionnalités :**
- Connexion avec email/mot de passe
- Génération de tokens JWT
- Vérification de l'authentification
- Déconnexion sécurisée

#### 2. ServiceContentController - Gestion du contenu
```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class ServiceContentController : ControllerBase
{
    // GET /api/servicecontent
    // GET /api/servicecontent/{key}
    // POST /api/servicecontent
    // PUT /api/servicecontent/{key}
    // DELETE /api/servicecontent/{key}
}
```

**Fonctionnalités :**
- CRUD complet pour le contenu
- Authentification requise (Admin uniquement)
- Validation des données

#### 3. MediaController - Gestion des médias
```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class MediaController : ControllerBase
{
    // GET /api/media
    // POST /api/media/upload
    // PUT /api/media/{id}
    // DELETE /api/media/{id}
}
```

**Fonctionnalités :**
- Upload de fichiers (images)
- Validation des types de fichiers
- Gestion des métadonnées
- Stockage sécurisé

#### 4. PublicController - API publique
```csharp
[ApiController]
[Route("api/[controller]")]
public class PublicController : ControllerBase
{
    // GET /api/public/service-content
    // GET /api/public/media
}
```

**Fonctionnalités :**
- Accès public au contenu
- Pas d'authentification requise
- Optimisé pour le frontend

### 🗃️ Modèles de données

#### User - Utilisateur
```csharp
public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool IsAdmin { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
}
```

#### ServiceContent - Contenu des services
```csharp
public class ServiceContent
{
    public int Id { get; set; }
    public string Key { get; set; }        // Ex: "hero_title"
    public string Content { get; set; }    // Contenu éditable
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int? UpdatedByUserId { get; set; }
    public User? UpdatedByUser { get; set; }
}
```

#### MediaFile - Fichiers médias
```csharp
public class MediaFile
{
    public int Id { get; set; }
    public string FileName { get; set; }
    public string FilePath { get; set; }   // Chemin relatif
    public string? MimeType { get; set; }
    public long FileSizeBytes { get; set; }
    public string? AltText { get; set; }
    public string? Description { get; set; }
    public string? Category { get; set; }
    public DateTime CreatedAt { get; set; }
    public int CreatedByUserId { get; set; }
    public User? CreatedByUser { get; set; }
}
```

### 🔧 Configuration Entity Framework

#### AppDbContext
```csharp
public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<ServiceContent> ServiceContents { get; set; }
    public DbSet<MediaFile> MediaFiles { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuration des relations
        // Index et contraintes
        // Données de seed
    }
}
```

#### Migrations
```bash
# Créer une migration
dotnet ef migrations add NomDeLaMigration

# Appliquer les migrations
dotnet ef database update

# Supprimer la dernière migration
dotnet ef migrations remove
```

### 🔐 Configuration JWT

#### Program.cs
```csharp
// Configuration JWT
var jwtKey = builder.Configuration["Jwt:Key"] ?? "YourSuperSecretKey...";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "Karima.Api";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "Karima.Client";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey))
        };
    });
```

### 📁 Gestion des fichiers

#### Configuration
```csharp
// Servir les fichiers statiques
app.UseStaticFiles();

// Dossier d'upload
var uploadsPath = Path.Combine(_environment.WebRootPath, "uploads", "media");
```

#### Upload sécurisé
```csharp
// Validation des types de fichiers
var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg" };

// Validation de la taille (max 10MB)
if (file.Length > 10 * 1024 * 1024)
{
    return BadRequest("Fichier trop volumineux");
}

// Génération d'un nom unique
var fileName = $"{Guid.NewGuid()}{fileExtension}";
```

---

## Frontend - React + TypeScript

### 🏗️ Architecture des composants

#### Structure des dossiers
```
src/
├── components/           # Composants réutilisables
│   ├── Header.tsx       # Navigation principale
│   ├── Footer.tsx       # Pied de page
│   ├── LoginForm.tsx    # Formulaire de connexion
│   ├── AdminDashboard.tsx # Tableau de bord admin
│   ├── ContentManagement.tsx # Gestion du contenu
│   └── MediaManagement.tsx  # Gestion des médias
├── pages/               # Pages de l'application
│   ├── Home.tsx         # Page d'accueil
│   ├── Services.tsx     # Page services
│   ├── About.tsx        # Page à propos
│   ├── Blog.tsx         # Page blog
│   └── Account.tsx      # Page mon compte
├── lib/                 # Services et utilitaires
│   ├── auth.ts          # Service d'authentification
│   ├── admin.ts         # Service d'administration
│   └── api.ts           # Configuration API
└── styles/              # Styles CSS
    └── index.css        # Styles globaux
```

### 🔐 Service d'authentification

#### auth.ts
```typescript
class AuthService {
  private readonly API_BASE = '/api';
  private readonly TOKEN_KEY = 'karima_token';
  private readonly USER_KEY = 'karima_user';

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur de connexion');
    }

    const authResponse: AuthResponse = await response.json();
    
    // Stockage local
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
    
    return authResponse;
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }
}
```

### 🎨 Composants principaux

#### Account.tsx - Page Mon Compte
```typescript
const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          await authService.logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }

  return <AdminDashboard />;
};
```

#### ContentManagement.tsx - Gestion du contenu
```typescript
const ContentManagement = () => {
  const [contents, setContents] = useState<ServiceContent[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const handleSave = async () => {
    if (!editingKey) return;
    
    try {
      await adminService.updateServiceContent(editingKey, editForm);
      await loadContents();
      setEditingKey(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  return (
    <div>
      {contents.map(content => (
        <div key={content.key} className="card">
          {/* Interface d'édition */}
        </div>
      ))}
    </div>
  );
};
```

#### MediaManagement.tsx - Gestion des médias
```typescript
const MediaManagement = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await adminService.uploadMediaFile(file, '', '', 'general');
      await loadData();
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept="image/*" />
      {/* Liste des médias */}
    </div>
  );
};
```

### 🎯 Routing et navigation

#### App.tsx
```typescript
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
```

### 🎨 Styles CSS

#### Variables CSS personnalisées
```css
:root {
  /* Couleurs primaires */
  --primary: #1F4E79;
  --primary-light: #2E5F8A;
  --primary-dark: #1A4266;
  
  /* Espacement */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Rayons de bordure */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}
```

---

## Base de données - SQL Server

### 🗄️ Configuration de la connexion

#### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=KarimaDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Key": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!",
    "Issuer": "Karima.Api",
    "Audience": "Karima.Client"
  }
}
```

### 📊 Schéma de la base de données

#### Table Users
```sql
CREATE TABLE Users (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Email nvarchar(200) NOT NULL UNIQUE,
    PasswordHash nvarchar(200) NOT NULL,
    FirstName nvarchar(100) NOT NULL,
    LastName nvarchar(100) NOT NULL,
    IsAdmin bit NOT NULL DEFAULT 0,
    CreatedAt datetime2 NOT NULL DEFAULT GETUTCDATE(),
    LastLoginAt datetime2 NULL
);
```

#### Table ServiceContents
```sql
CREATE TABLE ServiceContents (
    Id int IDENTITY(1,1) PRIMARY KEY,
    [Key] nvarchar(100) NOT NULL UNIQUE,
    Content nvarchar(max) NOT NULL,
    Description nvarchar(500) NULL,
    CreatedAt datetime2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt datetime2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedByUserId int NULL,
    FOREIGN KEY (UpdatedByUserId) REFERENCES Users(Id)
);
```

#### Table MediaFiles
```sql
CREATE TABLE MediaFiles (
    Id int IDENTITY(1,1) PRIMARY KEY,
    FileName nvarchar(500) NOT NULL,
    FilePath nvarchar(1000) NOT NULL,
    MimeType nvarchar(100) NULL,
    FileSizeBytes bigint NOT NULL,
    AltText nvarchar(200) NULL,
    Description nvarchar(500) NULL,
    Category nvarchar(100) NULL,
    CreatedAt datetime2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedByUserId int NOT NULL,
    FOREIGN KEY (CreatedByUserId) REFERENCES Users(Id)
);
```

### 🌱 Données de seed

#### Utilisateur admin par défaut
```csharp
modelBuilder.Entity<User>().HasData(
    new User 
    { 
        Id = 1, 
        Email = "admin@karima.com", 
        PasswordHash = "$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
        FirstName = "Admin",
        LastName = "Karima",
        IsAdmin = true,
        CreatedAt = seedDate
    }
);
```

#### Contenu par défaut des services
```csharp
modelBuilder.Entity<ServiceContent>().HasData(
    new ServiceContent { 
        Id = 1, 
        Key = "hero_title", 
        Content = "Nos Services", 
        Description = "Titre principal de la section hero",
        CreatedAt = seedDate, 
        UpdatedAt = seedDate 
    },
    // ... autres contenus
);
```

---

## Authentification et sécurité

### 🔐 JWT (JSON Web Tokens)

#### Structure du token
```json
{
  "sub": "1",                    // User ID
  "email": "admin@karima.com",
  "name": "Admin Karima",
  "role": "Admin",
  "exp": 1640995200,            // Expiration
  "iss": "Karima.Api",          // Issuer
  "aud": "Karima.Client"        // Audience
}
```

#### Génération du token
```csharp
private string GenerateJwtToken(User user)
{
    var key = Encoding.ASCII.GetBytes(jwtKey);
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
            new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User")
        }),
        Expires = DateTime.UtcNow.AddHours(24),
        Issuer = jwtIssuer,
        Audience = jwtAudience,
        SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(key), 
            SecurityAlgorithms.HmacSha256Signature)
    };

    var tokenHandler = new JwtSecurityTokenHandler();
    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
}
```

### 🔒 Hachage des mots de passe

#### Utilisation de BCrypt
```csharp
// Hachage lors de la création
var passwordHash = BCrypt.Net.BCrypt.HashPassword("motdepasse");

// Vérification lors de la connexion
var isValid = BCrypt.Net.BCrypt.Verify(password, passwordHash);
```

### 🛡️ Autorisation par rôles

#### Attributs d'autorisation
```csharp
[Authorize(Roles = "Admin")]  // Admin uniquement
[Authorize]                   // Utilisateur connecté
[AllowAnonymous]              // Accès public
```

#### Vérification côté client
```typescript
const isAuthenticated = authService.isAuthenticated();
const user = authService.getUser();
const isAdmin = user?.isAdmin;
```

---

## Gestion des fichiers

### 📁 Structure des dossiers

```
api/
├── wwwroot/              # Fichiers statiques
│   └── uploads/          # Dossier d'upload
│       └── media/        # Images uploadées
│           ├── image1.jpg
│           ├── image2.png
│           └── ...
└── ...
```

### 🔧 Configuration du stockage

#### Program.cs
```csharp
// Servir les fichiers statiques
app.UseStaticFiles();

// Configuration du dossier wwwroot
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.WebRootPath, "uploads")),
    RequestPath = "/uploads"
});
```

### 📤 Processus d'upload

#### 1. Validation côté client
```typescript
const handleFileUpload = async (file: File) => {
  // Vérification du type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Type de fichier non autorisé');
  }

  // Vérification de la taille (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Fichier trop volumineux');
  }
};
```

#### 2. Upload vers l'API
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('altText', altText);
formData.append('description', description);
formData.append('category', category);

const response = await fetch('/api/media/upload', {
  method: 'POST',
  headers: authService.getFormDataHeaders(),
  body: formData
});
```

#### 3. Traitement côté serveur
```csharp
// Validation des extensions
var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg" };
var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();

if (!allowedExtensions.Contains(fileExtension))
{
    return BadRequest("Type de fichier non autorisé");
}

// Génération d'un nom unique
var fileName = $"{Guid.NewGuid()}{fileExtension}";
var filePath = Path.Combine(uploadsPath, fileName);

// Sauvegarde du fichier
using (var stream = new FileStream(filePath, FileMode.Create))
{
    await file.CopyToAsync(stream);
}
```

### 🗑️ Suppression des fichiers

```csharp
// Supprimer le fichier physique
var fullPath = Path.Combine(_environment.WebRootPath, mediaFile.FilePath.TrimStart('/'));
if (System.IO.File.Exists(fullPath))
{
    System.IO.File.Delete(fullPath);
}

// Supprimer l'entrée en base de données
_context.MediaFiles.Remove(mediaFile);
await _context.SaveChangesAsync();
```

---

## Déploiement

### 🚀 Environnement de développement

#### Backend
```bash
cd api
dotnet run
# API disponible sur http://localhost:5000
# Swagger sur http://localhost:5000/swagger
```

#### Frontend
```bash
cd web
npm run dev
# Application disponible sur http://localhost:5173
```

### 🌐 Environnement de production

#### Configuration IIS
```xml
<system.webServer>
  <handlers>
    <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
  </handlers>
  <aspNetCore processPath="dotnet" arguments=".\Karima.Api.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" />
</system.webServer>
```

#### Variables d'environnement
```bash
# Production
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection="Server=prod-server;Database=KarimaDb;..."
Jwt__Key="ProductionSecretKey..."
```

#### Build de production
```bash
# Backend
dotnet publish -c Release -o ./publish

# Frontend
npm run build
```

### 🐳 Docker (optionnel)

#### Dockerfile API
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["api/Karima.Api.csproj", "api/"]
RUN dotnet restore "api/Karima.Api.csproj"
COPY . .
WORKDIR "/src/api"
RUN dotnet build "Karima.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Karima.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Karima.Api.dll"]
```

#### Dockerfile Frontend
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Troubleshooting

### ❌ Problèmes courants

#### 1. Erreur de connexion à la base de données
```
System.InvalidOperationException: No connection string named 'DefaultConnection' was found.
```
**Solution :** Vérifier le fichier `appsettings.json` et la chaîne de connexion.

#### 2. Erreur CORS
```
Access to fetch at 'http://localhost:5000/api/auth/login' from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solution :** Vérifier la configuration CORS dans `Program.cs`.

#### 3. Erreur JWT
```
Microsoft.IdentityModel.Tokens.SecurityTokenExpiredException: The token is expired
```
**Solution :** Le token a expiré, l'utilisateur doit se reconnecter.

#### 4. Erreur d'upload de fichier
```
System.IO.DirectoryNotFoundException: Could not find a part of the path
```
**Solution :** Créer le dossier `wwwroot/uploads/media` manuellement.

#### 5. Erreur de migration
```
The migration 'AddUserAndContentManagement' has already been applied to the database
```
**Solution :** Utiliser un nom de migration différent ou supprimer la migration existante.

### 🔍 Logs et débogage

#### Activation des logs détaillés
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  }
}
```

#### Logs côté client
```typescript
// Dans le navigateur (F12 > Console)
console.log('Token:', authService.getToken());
console.log('User:', authService.getUser());
```

### 🛠️ Outils de débogage

#### Swagger UI
- URL : `http://localhost:5000/swagger`
- Permet de tester les endpoints API
- Documentation interactive

#### Entity Framework Tools
```bash
# Voir les migrations
dotnet ef migrations list

# Voir le SQL généré
dotnet ef migrations script

# Réinitialiser la base de données
dotnet ef database drop
dotnet ef database update
```

#### Outils de développement
- **Chrome DevTools** : Debug du frontend
- **Postman** : Test des API
- **SQL Server Management Studio** : Gestion de la base de données

---

## Bonnes pratiques

### 🏗️ Architecture

#### 1. Séparation des responsabilités
- **Contrôleurs** : Gestion des requêtes HTTP
- **Services** : Logique métier
- **Repositories** : Accès aux données
- **DTOs** : Transfert de données

#### 2. Validation des données
```csharp
[Required]
[MaxLength(200)]
public string Email { get; set; }

[Required]
[MinLength(6)]
public string Password { get; set; }
```

#### 3. Gestion des erreurs
```csharp
try
{
    // Opération
}
catch (Exception ex)
{
    _logger.LogError(ex, "Erreur lors de l'opération");
    return StatusCode(500, "Erreur interne du serveur");
}
```

### 🔒 Sécurité

#### 1. Authentification
- Utiliser des tokens JWT avec expiration
- Hacher les mots de passe avec BCrypt
- Valider les tokens côté serveur

#### 2. Autorisation
- Vérifier les rôles pour les actions sensibles
- Utiliser des attributs `[Authorize]`
- Valider les permissions côté client ET serveur

#### 3. Validation des entrées
- Valider tous les inputs utilisateur
- Sanitizer les données avant stockage
- Utiliser des DTOs pour les transferts

### 📊 Performance

#### 1. Base de données
- Utiliser des index sur les colonnes fréquemment recherchées
- Éviter les requêtes N+1 avec `Include()`
- Utiliser la pagination pour les grandes listes

#### 2. API
- Mettre en cache les données statiques
- Utiliser la compression gzip
- Optimiser les requêtes SQL

#### 3. Frontend
- Lazy loading des composants
- Optimisation des images
- Mise en cache des données

### 🧪 Tests

#### 1. Tests unitaires
```csharp
[Test]
public void Login_WithValidCredentials_ReturnsToken()
{
    // Arrange
    var authController = new AuthController(mockContext, mockConfig);
    var loginRequest = new AuthRequest { Email = "admin@karima.com", Password = "admin123" };

    // Act
    var result = await authController.Login(loginRequest);

    // Assert
    Assert.IsNotNull(result);
    Assert.IsNotNull(result.Value.Token);
}
```

#### 2. Tests d'intégration
```csharp
[Test]
public async Task UploadFile_WithValidFile_ReturnsMediaFile()
{
    // Test d'upload de fichier
    var file = CreateTestFile();
    var result = await _client.PostAsync("/api/media/upload", content);
    
    Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
}
```

### 📝 Documentation

#### 1. Code
- Commenter les méthodes complexes
- Utiliser des noms de variables explicites
- Documenter les paramètres et retours

#### 2. API
- Utiliser Swagger/OpenAPI
- Ajouter des exemples de requêtes
- Documenter les codes d'erreur

#### 3. Base de données
- Documenter le schéma
- Expliquer les relations
- Maintenir un historique des migrations

---

## 🎯 Conclusion

Cette documentation technique complète couvre tous les aspects du projet Karima :

### ✅ Ce qui a été implémenté
- **Backend .NET 8** avec API REST complète
- **Frontend React + TypeScript** avec interface moderne
- **Base de données SQL Server** avec Entity Framework Core
- **Authentification JWT** sécurisée
- **Gestion des fichiers** avec upload et stockage
- **Documentation Swagger** automatique

### 🚀 Prochaines étapes possibles
- Ajout de tests unitaires et d'intégration
- Mise en place de la CI/CD
- Optimisation des performances
- Ajout de nouvelles fonctionnalités (blog, newsletter, etc.)
- Déploiement en production

### 📚 Ressources utiles
- [Documentation .NET 8](https://docs.microsoft.com/dotnet/)
- [Documentation React](https://react.dev/)
- [Documentation Entity Framework Core](https://docs.microsoft.com/ef/)
- [Documentation JWT](https://jwt.io/)

Cette stack technologique moderne et robuste permet de créer des applications web performantes et maintenables. La séparation claire entre frontend et backend, l'utilisation de TypeScript pour la sécurité des types, et l'architecture RESTful facilitent le développement et la maintenance du projet.

---

*Documentation générée le $(Get-Date) - Projet Karima v1.0*
