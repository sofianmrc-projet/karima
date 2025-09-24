-- =====================================================
-- SCRIPT COMPLET KARIMA - STRUCTURE ET DONNÉES
-- =====================================================
-- Ce script contient toute la structure de la base de données
-- et toutes les données nécessaires pour reprendre le projet

-- =====================================================
-- 1. CRÉATION DES TABLES
-- =====================================================

-- Table Users
CREATE TABLE [Users] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Email] nvarchar(200) NOT NULL,
    [PasswordHash] nvarchar(200) NOT NULL,
    [FirstName] nvarchar(100) NOT NULL,
    [LastName] nvarchar(100) NOT NULL,
    [IsAdmin] bit NOT NULL DEFAULT 0,
    [LastLoginAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
);

-- Table Todos
CREATE TABLE [Todos] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Title] nvarchar(200) NOT NULL,
    [Done] bit NOT NULL DEFAULT 0,
    [CreatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT [PK_Todos] PRIMARY KEY ([Id])
);

-- Table ContactRequests
CREATE TABLE [ContactRequests] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(100) NOT NULL,
    [Email] nvarchar(200) NOT NULL,
    [Message] nvarchar(1000) NOT NULL,
    [CreatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT [PK_ContactRequests] PRIMARY KEY ([Id])
);

-- Table ServiceContents
CREATE TABLE [ServiceContents] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Key] nvarchar(100) NOT NULL,
    [Content] nvarchar(max) NOT NULL,
    [Description] nvarchar(500) NULL,
    [CreatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedByUserId] int NULL,
    CONSTRAINT [PK_ServiceContents] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ServiceContents_Users_UpdatedByUserId] FOREIGN KEY ([UpdatedByUserId]) REFERENCES [Users] ([Id]) ON DELETE SET NULL
);

-- Table MediaFiles
CREATE TABLE [MediaFiles] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FileName] nvarchar(500) NOT NULL,
    [FilePath] nvarchar(1000) NOT NULL,
    [FileSizeBytes] bigint NOT NULL,
    [MimeType] nvarchar(100) NULL,
    [AltText] nvarchar(200) NULL,
    [Description] nvarchar(500) NULL,
    [Category] nvarchar(100) NULL,
    [CreatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedByUserId] int NOT NULL,
    CONSTRAINT [PK_MediaFiles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_MediaFiles_Users_CreatedByUserId] FOREIGN KEY ([CreatedByUserId]) REFERENCES [Users] ([Id]) ON DELETE RESTRICT
);

-- Table Sections
CREATE TABLE [Sections] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Key] nvarchar(100) NOT NULL,
    [Title] nvarchar(200) NOT NULL,
    [Content] nvarchar(max) NOT NULL,
    [Description] nvarchar(500) NULL,
    [ImageUrl] nvarchar(200) NULL,
    [AltText] nvarchar(200) NULL,
    [Category] nvarchar(100) NULL,
    [SortOrder] int NOT NULL,
    [IsActive] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedByUserId] int NULL,
    CONSTRAINT [PK_Sections] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Sections_Users_UpdatedByUserId] FOREIGN KEY ([UpdatedByUserId]) REFERENCES [Users] ([Id]) ON DELETE NO ACTION
);

-- =====================================================
-- 2. INDEX ET CONTRAINTES
-- =====================================================

-- Index unique sur Email des Users
CREATE UNIQUE INDEX [IX_Users_Email] ON [Users] ([Email]);

-- Index unique sur Key des ServiceContents
CREATE UNIQUE INDEX [IX_ServiceContents_Key] ON [ServiceContents] ([Key]);

-- Index unique sur Key des Sections
CREATE UNIQUE INDEX [IX_Sections_Key] ON [Sections] ([Key]);

-- Index sur les clés étrangères
CREATE INDEX [IX_MediaFiles_CreatedByUserId] ON [MediaFiles] ([CreatedByUserId]);
CREATE INDEX [IX_ServiceContents_UpdatedByUserId] ON [ServiceContents] ([UpdatedByUserId]);
CREATE INDEX [IX_Sections_UpdatedByUserId] ON [Sections] ([UpdatedByUserId]);

-- =====================================================
-- 3. DONNÉES DE DÉMONSTRATION
-- =====================================================

-- Utilisateur admin (mot de passe: admin123)
INSERT INTO [Users] ([Email], [PasswordHash], [FirstName], [LastName], [IsAdmin], [CreatedAt])
VALUES ('admin@karima.fr', 'AQAAAAEAACcQAAAAEHashExample123456789', 'Admin', 'Karima', 1, '2025-09-11T00:00:00.0000000Z');

-- Todos de démonstration
INSERT INTO [Todos] ([Title], [Done], [CreatedAt])
VALUES 
('Créer la maquette du site Karima', 1, '2025-09-11T00:00:00.0000000Z'),
('Développer l''API backend', 1, '2025-09-11T00:00:00.0000000Z'),
('Implémenter le frontend React', 0, '2025-09-11T00:00:00.0000000Z'),
('Configurer la base de données', 0, '2025-09-11T00:00:00.0000000Z');

-- Sections du site (toutes les catégories)
INSERT INTO [Sections] ([Key], [Title], [Content], [Description], [Category], [SortOrder], [IsActive], [CreatedAt], [UpdatedAt])
VALUES 
-- ACCUEIL
('home_hero', 'Section Hero - Accueil', 'Bienvenue chez Karima', 'Titre principal de la page d''accueil', 'Accueil', 1, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('home_hero_subtitle', 'Sous-titre Hero', 'Votre partenaire de confiance', 'Sous-titre de la page d''accueil', 'Accueil', 2, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('home_hero_description', 'Description Hero', 'Des solutions innovantes pour votre entreprise', 'Description principale de la page d''accueil', 'Accueil', 3, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('home_about', 'Section À propos', 'Une entreprise dédiée à votre succès', 'Section à propos sur l''accueil', 'Accueil', 4, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('home_stats', 'Statistiques', '100+ Projets réalisés|50+ Clients satisfaits|5+ Années d''expérience', 'Statistiques de l''entreprise', 'Accueil', 5, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),

-- SERVICES
('services_hero', 'Hero Services', 'Nos Services', 'Titre principal de la page services', 'Services', 1, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('services_description', 'Description Services', 'Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels', 'Description de la page services', 'Services', 2, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('service_consulting', 'Consulting Stratégique', 'Accompagnement personnalisé pour optimiser vos processus et améliorer vos performances organisationnelles.', 'Premier service', 'Services', 3, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('service_formation', 'Formation Professionnelle', 'Formations sur mesure pour développer les compétences de vos équipes et améliorer leur performance.', 'Deuxième service', 'Services', 4, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('service_accompagnement', 'Accompagnement Continu', 'Support permanent pour assurer la réussite de vos projets et transformations organisationnelles.', 'Troisième service', 'Services', 5, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),

-- À PROPOS
('about_hero', 'Hero À propos', 'À propos de nous', 'Titre principal de la page à propos', 'À propos', 1, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('about_company', 'Notre entreprise', 'Une entreprise dédiée à l''excellence et à l''innovation', 'Section entreprise', 'À propos', 2, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('about_team', 'Notre équipe', 'Des professionnels passionnés et expérimentés', 'Section équipe', 'À propos', 3, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('about_values', 'Nos valeurs', 'Des valeurs qui nous guident au quotidien', 'Section valeurs', 'À propos', 4, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),

-- BLOG
('blog_hero', 'Blog & Actualités', 'Découvrez nos derniers articles, conseils et réflexions sur l''excellence organisationnelle et le développement professionnel.', 'Titre principal de la page blog', 'Blog', 1, 1, '2025-09-24T00:00:00.0000000Z', '2025-09-24T00:00:00.0000000Z'),
('blog_article_1', 'Les 5 clés du leadership moderne', 'Dans un monde en constante évolution, le leadership moderne nécessite de nouvelles compétences et approches. Découvrez les 5 clés essentielles pour devenir un leader efficace et inspirant.', 'Article sur le leadership', 'Blog', 2, 1, '2025-09-24T00:00:00.0000000Z', '2025-09-24T00:00:00.0000000Z'),
('blog_article_2', 'Optimiser la performance de vos équipes', 'Comment créer un environnement de travail qui favorise la productivité et l''épanouissement de vos collaborateurs. Des stratégies éprouvées pour maximiser les résultats.', 'Article sur la performance des équipes', 'Blog', 3, 1, '2025-09-24T00:00:00.0000000Z', '2025-09-24T00:00:00.0000000Z'),
('blog_article_3', 'La transformation digitale : par où commencer ?', 'La transformation digitale n''est pas qu''une question de technologie. C''est avant tout une transformation culturelle et organisationnelle. Nos conseils pour bien démarrer.', 'Article sur la transformation digitale', 'Blog', 4, 1, '2025-09-24T00:00:00.0000000Z', '2025-09-24T00:00:00.0000000Z'),

-- CONTACT
('contact_hero', 'Hero Contact', 'Contactez-nous', 'Titre principal de la page contact', 'Contact', 1, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('contact_info', 'Informations de contact', '123 Rue de la Paix, 75001 Paris|+33 1 23 45 67 89|contact@karima.com|Lun-Ven: 9h-18h', 'Coordonnées de contact', 'Contact', 2, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),

-- FOOTER
('footer_company', 'Footer - Entreprise', 'Karima', 'Nom de l''entreprise dans le footer', 'Footer', 1, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('footer_description', 'Footer - Description', 'Votre partenaire de confiance pour tous vos projets', 'Description dans le footer', 'Footer', 2, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('footer_copyright', 'Footer - Copyright', '© 2025 Karima. Tous droits réservés.', 'Copyright dans le footer', 'Footer', 3, 1, '2025-09-11T00:00:00.0000000Z', '2025-09-11T00:00:00.0000000Z'),
('footer_email', 'Email Footer', 'contact@karima.fr', 'Email de contact dans le footer', 'Footer', 4, 1, '2025-09-24T00:00:00.0000000Z', '2025-09-24T00:00:00.0000000Z'),
('footer_phone', 'Téléphone Footer', '01 23 45 67 89', 'Téléphone de contact dans le footer', 'Footer', 5, 1, '2025-09-24T00:00:00.0000000Z', '2025-09-24T00:00:00.0000000Z'),
('footer_address', 'Adresse Footer', '123 Avenue des Champs, 75008 Paris', 'Adresse de contact dans le footer', 'Footer', 6, 1, '2025-09-24T00:00:00.0000000Z', '2025-09-24T00:00:00.0000000Z');

-- =====================================================
-- 4. VÉRIFICATIONS
-- =====================================================

-- Vérifier le nombre de sections par catégorie
SELECT Category, COUNT(*) as NombreSections 
FROM Sections 
GROUP BY Category 
ORDER BY Category;

-- Vérifier les utilisateurs
SELECT Id, Email, FirstName, LastName, IsAdmin, CreatedAt 
FROM Users;

-- Vérifier les todos
SELECT Id, Title, Done, CreatedAt 
FROM Todos;

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================
