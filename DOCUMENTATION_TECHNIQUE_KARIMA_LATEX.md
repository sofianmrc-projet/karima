# Documentation Technique Complete - Projet Karima

## Table des Matieres

1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Architecture generale](#architecture-générale)
3. [Stack technologique](#stack-technologique)
4. [Configuration de l'environnement](#configuration-de-lenvironnement)
5. [Backend - API .NET 8](#backend---api-net-8)
6. [Frontend - React + TypeScript](#frontend---react--typescript)
7. [Base de donnees - SQL Server](#base-de-données---sql-server)
8. [Authentification et securite](#authentification-et-sécurité)
9. [Gestion des fichiers](#gestion-des-fichiers)
10. [Deploiement](#déploiement)
11. [Troubleshooting](#troubleshooting)
12. [Bonnes pratiques](#bonnes-pratiques)

---

## Vue d'ensemble du projet

### Objectif
Le projet Karima est une application web complete permettant la gestion d'un site vitrine avec un espace d'administration pour :
- Modifier le contenu des pages (notamment la page Services)
- Uploader et gerer des images
- Authentifier les administrateurs

### Structure du projet
```
karima/
├── api/                    # Backend .NET 8 Web API
│   ├── Controllers/        # Controleurs API
│   ├── Models/            # Modeles de donnees
│   ├── Data/              # Contexte Entity Framework
│   ├── Migrations/        # Migrations de base de donnees
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

## Architecture generale

### Flux de donnees
```
[Frontend React] <-> [API .NET 8] <-> [SQL Server]
       |
       v
[Fichiers statiques] <-> [Dossier uploads/]
```

### Communication
- **Frontend vers API** : Requetes HTTP (GET, POST, PUT, DELETE)
- **API vers Base de donnees** : Entity Framework Core
- **API vers Fichiers** : Stockage local sur le serveur

---

## Stack technologique

### Backend
- **.NET 8** : Framework principal
- **ASP.NET Core Web API** : Creation d'API REST
- **Entity Framework Core** : ORM pour la base de donnees
- **SQL Server** : Base de donnees relationnelle
- **JWT Bearer** : Authentification par tokens
- **BCrypt** : Hachage des mots de passe
- **Swagger/OpenAPI** : Documentation automatique

### Frontend
- **React 18** : Bibliotheque UI
- **TypeScript** : Langage type
- **Vite** : Build tool et serveur de developpement
- **React Router** : Navigation cote client
- **Fetch API** : Communication avec l'API

### Base de donnees
- **SQL Server** : SGBD principal
- **Migrations EF Core** : Versioning du schema
- **Relations** : Cles etrangeres et contraintes

---

## Configuration de l'environnement

### Prerequis
1. **Visual Studio 2022** ou **VS Code** avec extension C#
2. **.NET 8 SDK**
3. **SQL Server** (LocalDB ou Express)
4. **Node.js 18+** et **npm**
5. **Git** pour le controle de version

### Installation
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

### Structure des controleurs

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

**Fonctionnalites :**
- Connexion avec email/mot de passe
- Generation de tokens JWT
- Verification de l'authentification
- Deconnexion securisee

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

**Fonctionnalites :**
- CRUD complet pour le contenu
- Authentification requise (Admin uniquement)
- Validation des donnees

#### 3. MediaController - Gestion des medias
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

**Fonctionnalites :**
- Upload de fichiers (images)
- Validation des types de fichiers
- Gestion des metadonnees
- Stockage securise

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

**Fonctionnalites :**
- Acces public au contenu
- Pas d'authentification requise
- Optimise pour le frontend

### Modeles de donnees

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
    public string Content { get; set; }    // Contenu editable
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int? UpdatedByUserId { get; set; }
    public User? UpdatedByUser { get; set; }
}
```

#### MediaFile - Fichiers medias
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

### Configuration Entity Framework

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
        // Donnees de seed
    }
}
```

#### Migrations
```bash
# Creer une migration
dotnet ef migrations add NomDeLaMigration

# Appliquer les migrations
dotnet ef database update

# Supprimer la derniere migration
dotnet ef migrations remove
```

### Configuration JWT

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

### Gestion des fichiers

#### Configuration
```csharp
// Servir les fichiers statiques
app.UseStaticFiles();

// Dossier d'upload
var uploadsPath = Path.Combine(_environment.WebRootPath, "uploads", "media");
```

#### Upload securise
```csharp
// Validation des types de fichiers
var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg" };

// Validation de la taille (max 10MB)
if (file.Length > 10 * 1024 * 1024)
{
    return BadRequest("Fichier trop volumineux");
}

// Generation d'un nom unique
var fileName = $"{Guid.NewGuid()}{fileExtension}";
```

---

## Frontend - React + TypeScript

### Architecture des composants

#### Structure des dossiers
```
src/
├── components/           # Composants reutilisables
│   ├── Header.tsx       # Navigation principale
│   ├── Footer.tsx       # Pied de page
│   ├── LoginForm.tsx    # Formulaire de connexion
│   ├── AdminDashboard.tsx # Tableau de bord admin
│   ├── ContentManagement.tsx # Gestion du contenu
│   └── MediaManagement.tsx  # Gestion des medias
├── pages/               # Pages de l'application
│   ├── Home.tsx         # Page d'accueil
│   ├── Services.tsx     # Page services
│   ├── About.tsx        # Page a propos
│   ├── Blog.tsx         # Page blog
│   └── Account.tsx      # Page mon compte
├── lib/                 # Services et utilitaires
│   ├── auth.ts          # Service d'authentification
│   ├── admin.ts         # Service d'administration
│   └── api.ts           # Configuration API
└── styles/              # Styles CSS
    └── index.css        # Styles globaux
```

### Service d'authentification

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

### Composants principaux

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
          {/* Interface d'edition */}
        </div>
      ))}
    </div>
  );
};
```

#### MediaManagement.tsx - Gestion des medias
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
      {/* Liste des medias */}
    </div>
  );
};
```

### Routing et navigation

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

### Styles CSS

#### Variables CSS personnalisees
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

## Base de donnees - SQL Server

### Configuration de la connexion

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

### Schema de la base de donnees

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

### Donnees de seed

#### Utilisateur admin par defaut
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

#### Contenu par defaut des services
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

## Authentification et securite

### JWT (JSON Web Tokens)

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

#### Generation du token
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

### Hachage des mots de passe

#### Utilisation de BCrypt
```csharp
// Hachage lors de la creation
var passwordHash = BCrypt.Net.BCrypt.HashPassword("motdepasse");

// Verification lors de la connexion
var isValid = BCrypt.Net.BCrypt.Verify(password, passwordHash);
```

### Autorisation par roles

#### Attributs d'autorisation
```csharp
[Authorize(Roles = "Admin")]  // Admin uniquement
[Authorize]                   // Utilisateur connecte
[AllowAnonymous]              // Acces public
```

#### Verification cote client
```typescript
const isAuthenticated = authService.isAuthenticated();
const user = authService.getUser();
const isAdmin = user?.isAdmin;
```

---

## Gestion des fichiers

### Structure des dossiers

```
api/
├── wwwroot/              # Fichiers statiques
│   └── uploads/          # Dossier d'upload
│       └── media/        # Images uploadees
│           ├── image1.jpg
│           ├── image2.png
│           └── ...
└── ...
```

### Configuration du stockage

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

### Processus d'upload

#### 1. Validation cote client
```typescript
const handleFileUpload = async (file: File) => {
  // Verification du type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Type de fichier non autorise');
  }

  // Verification de la taille (10MB max)
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

#### 3. Traitement cote serveur
```csharp
// Validation des extensions
var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg" };
var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();

if (!allowedExtensions.Contains(fileExtension))
{
    return BadRequest("Type de fichier non autorise");
}

// Generation d'un nom unique
var fileName = $"{Guid.NewGuid()}{fileExtension}";
var filePath = Path.Combine(uploadsPath, fileName);

// Sauvegarde du fichier
using (var stream = new FileStream(filePath, FileMode.Create))
{
    await file.CopyToAsync(stream);
}
```

### Suppression des fichiers

```csharp
// Supprimer le fichier physique
var fullPath = Path.Combine(_environment.WebRootPath, mediaFile.FilePath.TrimStart('/'));
if (System.IO.File.Exists(fullPath))
{
    System.IO.File.Delete(fullPath);
}

// Supprimer l'entree en base de donnees
_context.MediaFiles.Remove(mediaFile);
await _context.SaveChangesAsync();
```

---

## Deploiement

### Environnement de developpement

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

### Environnement de production

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

---

## Troubleshooting

### Problemes courants

#### 1. Erreur de connexion a la base de donnees
```
System.InvalidOperationException: No connection string named 'DefaultConnection' was found.
```
**Solution :** Verifier le fichier `appsettings.json` et la chaine de connexion.

#### 2. Erreur CORS
```
Access to fetch at 'http://localhost:5000/api/auth/login' from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solution :** Verifier la configuration CORS dans `Program.cs`.

#### 3. Erreur JWT
```
Microsoft.IdentityModel.Tokens.SecurityTokenExpiredException: The token is expired
```
**Solution :** Le token a expire, l'utilisateur doit se reconnecter.

#### 4. Erreur d'upload de fichier
```
System.IO.DirectoryNotFoundException: Could not find a part of the path
```
**Solution :** Creer le dossier `wwwroot/uploads/media` manuellement.

#### 5. Erreur de migration
```
The migration 'AddUserAndContentManagement' has already been applied to the database
```
**Solution :** Utiliser un nom de migration different ou supprimer la migration existante.

### Logs et debogage

#### Activation des logs detailles
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

#### Logs cote client
```typescript
// Dans le navigateur (F12 > Console)
console.log('Token:', authService.getToken());
console.log('User:', authService.getUser());
```

### Outils de debogage

#### Swagger UI
- URL : `http://localhost:5000/swagger`
- Permet de tester les endpoints API
- Documentation interactive

#### Entity Framework Tools
```bash
# Voir les migrations
dotnet ef migrations list

# Voir le SQL genere
dotnet ef migrations script

# Reinitialiser la base de donnees
dotnet ef database drop
dotnet ef database update
```

#### Outils de developpement
- **Chrome DevTools** : Debug du frontend
- **Postman** : Test des API
- **SQL Server Management Studio** : Gestion de la base de donnees

---

## Bonnes pratiques

### Architecture

#### 1. Separation des responsabilites
- **Controleurs** : Gestion des requetes HTTP
- **Services** : Logique metier
- **Repositories** : Acces aux donnees
- **DTOs** : Transfert de donnees

#### 2. Validation des donnees
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
    // Operation
}
catch (Exception ex)
{
    _logger.LogError(ex, "Erreur lors de l'operation");
    return StatusCode(500, "Erreur interne du serveur");
}
```

### Securite

#### 1. Authentification
- Utiliser des tokens JWT avec expiration
- Hacher les mots de passe avec BCrypt
- Valider les tokens cote serveur

#### 2. Autorisation
- Verifier les roles pour les actions sensibles
- Utiliser des attributs `[Authorize]`
- Valider les permissions cote client ET serveur

#### 3. Validation des entrees
- Valider tous les inputs utilisateur
- Sanitizer les donnees avant stockage
- Utiliser des DTOs pour les transferts

### Performance

#### 1. Base de donnees
- Utiliser des index sur les colonnes frequemment recherchees
- Eviter les requetes N+1 avec `Include()`
- Utiliser la pagination pour les grandes listes

#### 2. API
- Mettre en cache les donnees statiques
- Utiliser la compression gzip
- Optimiser les requetes SQL

#### 3. Frontend
- Lazy loading des composants
- Optimisation des images
- Mise en cache des donnees

### Tests

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

#### 2. Tests d'integration
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

### Documentation

#### 1. Code
- Commenter les methodes complexes
- Utiliser des noms de variables explicites
- Documenter les parametres et retours

#### 2. API
- Utiliser Swagger/OpenAPI
- Ajouter des exemples de requetes
- Documenter les codes d'erreur

#### 3. Base de donnees
- Documenter le schema
- Expliquer les relations
- Maintenir un historique des migrations

---

## Conclusion

Cette documentation technique complete couvre tous les aspects du projet Karima :

### Ce qui a ete implemente
- **Backend .NET 8** avec API REST complete
- **Frontend React + TypeScript** avec interface moderne
- **Base de donnees SQL Server** avec Entity Framework Core
- **Authentification JWT** securisee
- **Gestion des fichiers** avec upload et stockage
- **Documentation Swagger** automatique

### Prochaines etapes possibles
- Ajout de tests unitaires et d'integration
- Mise en place de la CI/CD
- Optimisation des performances
- Ajout de nouvelles fonctionnalites (blog, newsletter, etc.)
- Deploiement en production

### Ressources utiles
- [Documentation .NET 8](https://docs.microsoft.com/dotnet/)
- [Documentation React](https://react.dev/)
- [Documentation Entity Framework Core](https://docs.microsoft.com/ef/)
- [Documentation JWT](https://jwt.io/)

Cette stack technologique moderne et robuste permet de creer des applications web performantes et maintenables. La separation claire entre frontend et backend, l'utilisation de TypeScript pour la securite des types, et l'architecture RESTful facilitent le developpement et la maintenance du projet.

---

*Documentation generee le $(Get-Date) - Projet Karima v1.0*
