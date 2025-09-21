# 📊 Tables de la Base de Données Karima

## 🗄️ Vue d'ensemble

La base de données contient **5 tables principales** pour gérer le site web dynamique :

## 📋 Table 1 : **Todos**
**Objectif :** Gestion des tâches de développement (table de démonstration)

| Colonne | Type | Description | Contraintes |
|---------|------|-------------|-------------|
| `Id` | int | Identifiant unique | PK, Auto-increment |
| `Title` | nvarchar(200) | Titre de la tâche | NOT NULL |
| `Done` | bit | Tâche terminée ou non | Default: false |
| `CreatedAt` | datetime2 | Date de création | NOT NULL, Default: GETUTCDATE() |

**Données de test :**
- ✅ Créer la maquette du site Karima
- ✅ Développer l'API backend
- ❌ Implémenter le frontend React
- ❌ Configurer la base de données

---

## 📋 Table 2 : **ContactRequests**
**Objectif :** Stockage des demandes de contact du formulaire

| Colonne | Type | Description | Contraintes |
|---------|------|-------------|-------------|
| `Id` | int | Identifiant unique | PK, Auto-increment |
| `Name` | nvarchar(100) | Nom du contact | NOT NULL |
| `Email` | nvarchar(200) | Email du contact | NOT NULL |
| `Message` | nvarchar(1000) | Message du contact | NOT NULL |
| `CreatedAt` | datetime2 | Date de création | NOT NULL, Default: GETUTCDATE() |

**Utilisation :** Formulaire de contact sur le site

---

## 📋 Table 3 : **Users**
**Objectif :** Gestion des utilisateurs et authentification

| Colonne | Type | Description | Contraintes |
|---------|------|-------------|-------------|
| `Id` | int | Identifiant unique | PK, Auto-increment |
| `Email` | nvarchar(200) | Email de l'utilisateur | NOT NULL, UNIQUE |
| `PasswordHash` | nvarchar(200) | Hash du mot de passe | NOT NULL |
| `FirstName` | nvarchar(100) | Prénom | NOT NULL |
| `LastName` | nvarchar(100) | Nom | NOT NULL |
| `IsAdmin` | bit | Administrateur ou non | Default: false |
| `CreatedAt` | datetime2 | Date de création | NOT NULL, Default: GETUTCDATE() |

**Utilisateur par défaut :**
- Email: `admin@karima.com`
- Mot de passe: `admin123`
- Rôle: Administrateur

---

## 📋 Table 4 : **ServiceContents** ⭐
**Objectif :** **TABLE PRINCIPALE** - Contenu dynamique de tout le site

| Colonne | Type | Description | Contraintes |
|---------|------|-------------|-------------|
| `Id` | int | Identifiant unique | PK, Auto-increment |
| `Key` | nvarchar(100) | Clé unique du contenu | NOT NULL, UNIQUE |
| `Content` | nvarchar(max) | Contenu textuel | NOT NULL |
| `Description` | nvarchar(500) | Description pour l'admin | NULL |
| `CreatedAt` | datetime2 | Date de création | NOT NULL, Default: GETUTCDATE() |
| `UpdatedAt` | datetime2 | Date de modification | NOT NULL, Default: GETUTCDATE() |
| `UpdatedByUserId` | int | ID de l'utilisateur qui a modifié | FK vers Users |

**Contenu stocké (47 éléments) :**

### 🏠 **Page d'Accueil (12 éléments)**
- `home_hero_title` : "Bienvenue chez Karima"
- `home_hero_subtitle` : "Votre partenaire de confiance"
- `home_hero_description` : "Des solutions innovantes pour votre entreprise"
- `home_hero_cta_text` : "Découvrir nos services"
- `home_about_title` : "À propos de nous"
- `home_about_description` : "Une entreprise dédiée à votre succès"
- `home_stat_1_number` : "100+"
- `home_stat_1_label` : "Projets réalisés"
- `home_stat_2_number` : "50+"
- `home_stat_2_label` : "Clients satisfaits"
- `home_stat_3_number` : "5+"
- `home_stat_3_label` : "Années d'expérience"

### ⚙️ **Page Services (8 éléments)**
- `services_hero_title` : "Nos Services"
- `services_hero_description` : "Des solutions complètes et personnalisées..."
- `services_section_title` : "Nos domaines d'expertise"
- `services_section_description` : "Chaque service est conçu pour vous apporter..."
- `services_process_title` : "Notre méthode de travail"
- `services_process_description` : "Une approche structurée et éprouvée..."
- `services_cta_title` : "Prêt à transformer votre organisation ?"
- `services_cta_description` : "Contactez-nous dès aujourd'hui..."

### 👥 **Page À propos (10 éléments)**
- `about_hero_title` : "À propos de nous"
- `about_hero_description` : "Découvrez notre histoire et notre mission"
- `about_company_title` : "Notre entreprise"
- `about_company_description` : "Une entreprise dédiée à l'excellence..."
- `about_team_title` : "Notre équipe"
- `about_team_description` : "Des professionnels passionnés..."
- `about_values_title` : "Nos valeurs"
- `about_values_description` : "Des valeurs qui nous guident..."
- `about_mission_title` : "Notre mission"
- `about_mission_description` : "Accompagner nos clients vers le succès"

### 📝 **Page Blog (6 éléments)**
- `blog_hero_title` : "Notre Blog"
- `blog_hero_description` : "Découvrez nos articles et actualités"
- `blog_section_title` : "Derniers articles"
- `blog_section_description` : "Restez informé de nos dernières actualités"
- `blog_cta_title` : "Restez informé"
- `blog_cta_description` : "Abonnez-vous à notre newsletter"

### 📞 **Page Contact (7 éléments)**
- `contact_hero_title` : "Contactez-nous"
- `contact_hero_description` : "Nous sommes là pour vous accompagner"
- `contact_info_title` : "Nos coordonnées"
- `contact_address` : "123 Rue de la Paix, 75001 Paris"
- `contact_phone` : "+33 1 23 45 67 89"
- `contact_email` : "contact@karima.com"
- `contact_hours` : "Lun-Ven: 9h-18h"

### 🦶 **Footer (4 éléments)**
- `footer_company_name` : "Karima"
- `footer_description` : "Votre partenaire de confiance pour tous vos projets"
- `footer_copyright` : "© 2025 Karima. Tous droits réservés."
- `footer_links_title` : "Mentions légales | Politique de confidentialité"

---

## 📋 Table 5 : **MediaFiles**
**Objectif :** Gestion des images et fichiers multimédias

| Colonne | Type | Description | Contraintes |
|---------|------|-------------|-------------|
| `Id` | int | Identifiant unique | PK, Auto-increment |
| `FileName` | nvarchar(500) | Nom original du fichier | NOT NULL |
| `FilePath` | nvarchar(1000) | Chemin relatif du fichier | NOT NULL |
| `MimeType` | nvarchar(100) | Type MIME du fichier | NULL |
| `FileSizeBytes` | bigint | Taille du fichier en octets | NOT NULL |
| `AltText` | nvarchar(200) | Texte alternatif pour l'accessibilité | NULL |
| `Description` | nvarchar(500) | Description du fichier | NULL |
| `Category` | nvarchar(100) | Catégorie du fichier | NULL |
| `CreatedAt` | datetime2 | Date de création | NOT NULL, Default: GETUTCDATE() |
| `CreatedByUserId` | int | ID de l'utilisateur qui a uploadé | FK vers Users, NOT NULL |

**Catégories possibles :**
- `hero` : Images de fond des sections hero
- `services` : Images pour la page services
- `about` : Images pour la page à propos
- `blog` : Images pour la page blog
- `contact` : Images pour la page contact
- `general` : Images générales

---

## 🔗 Relations entre les tables

```
Users (1) ──→ (0..*) ServiceContents [UpdatedByUserId]
Users (1) ──→ (0..*) MediaFiles [CreatedByUserId]
```

## 📊 Statistiques de la base de données

| Table | Nombre d'enregistrements | Description |
|-------|-------------------------|-------------|
| **Todos** | 4 | Tâches de démonstration |
| **ContactRequests** | 0+ | Demandes de contact |
| **Users** | 1 | Utilisateur admin par défaut |
| **ServiceContents** | 47 | Contenu dynamique du site |
| **MediaFiles** | 0+ | Images et fichiers uploadés |

## 🎯 Utilisation principale

### **ServiceContents** = **Cœur du système**
- **47 éléments** de contenu modifiables
- **Toutes les pages** du site sont dynamiques
- **Interface d'administration** pour modifier le contenu
- **API REST** pour la lecture et modification

### **MediaFiles** = **Gestion des images**
- **Upload d'images** via l'interface admin
- **Catégorisation** des images
- **Sélecteur d'images** dans l'éditeur visuel
- **Stockage** dans le dossier `wwwroot/uploads/media/`

## 🚀 Avantages de cette architecture

1. **✅ Site 100% dynamique** : Tout le contenu est modifiable
2. **✅ Interface d'administration** : Modification sans code
3. **✅ Gestion des médias** : Upload et organisation des images
4. **✅ Traçabilité** : Qui a modifié quoi et quand
5. **✅ Extensibilité** : Facile d'ajouter de nouveaux contenus
6. **✅ Performance** : Requêtes optimisées avec index
7. **✅ Sécurité** : Authentification et autorisation

**Cette base de données permet de gérer entièrement le contenu du site de manière dynamique et professionnelle !** 🎉
