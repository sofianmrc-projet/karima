-- Requêtes SQL pour modifier le contenu des sections
-- Changement de "Accueil" vers "Cabinet" et ajout de nouvelles sections

-- 1. MODIFIER LES SECTIONS ACCUEIL -> CABINET
-- Changer la catégorie "Accueil" en "Cabinet"
UPDATE Sections 
SET Category = 'Cabinet', UpdatedAt = GETUTCDATE()
WHERE Category = 'Accueil';

-- 2. MODIFIER LE CONTENU DES SECTIONS CABINET
-- Section Hero principale
UPDATE Sections 
SET Content = 'Cabinet Karima - Expertise Juridique et Sociale', UpdatedAt = GETUTCDATE()
WHERE [Key] = 'home_hero';

-- Sous-titre Hero
UPDATE Sections 
SET Content = 'Consultante en droit social et accompagnement RH', UpdatedAt = GETUTCDATE()
WHERE [Key] = 'home_hero_subtitle';

-- Description Hero
UPDATE Sections 
SET Content = 'Spécialisée dans le droit social, je vous accompagne dans la gestion de vos ressources humaines et la conformité juridique de votre entreprise.', UpdatedAt = GETUTCDATE()
WHERE [Key] = 'home_hero_description';

-- Section À propos
UPDATE Sections 
SET Content = 'Un cabinet spécialisé dans le conseil en droit social et l\'accompagnement des entreprises dans leurs défis RH', UpdatedAt = GETUTCDATE()
WHERE [Key] = 'home_about';

-- Statistiques
UPDATE Sections 
SET Content = '10+ Années d\'expérience|200+ Dossiers traités|50+ Entreprises accompagnées', UpdatedAt = GETUTCDATE()
WHERE [Key] = 'home_stats';

-- 3. MODIFIER LES SECTIONS SERVICES
-- Hero Services
UPDATE Sections 
SET Content = 'Nos Domaines d\'Intervention', UpdatedAt = GETUTCDATE()
WHERE [Key] = 'services_hero';

-- Description Services
UPDATE Sections 
SET Content = 'Des prestations spécialisées en droit social pour vous accompagner dans tous vos projets RH et juridiques', UpdatedAt = GETUTCDATE()
WHERE [Key] = 'services_description';

-- Service 1 - Consulting -> Compétences
UPDATE Sections 
SET Title = 'Compétences en Droit Social', 
    Content = 'Expertise approfondie en droit du travail, conventions collectives, et réglementation sociale. Conseil personnalisé pour vos problématiques RH.',
    Description = 'Domaines de compétences juridiques',
    UpdatedAt = GETUTCDATE()
WHERE [Key] = 'service_consulting';

-- Service 2 - Formation -> Domaines d'Intervention
UPDATE Sections 
SET Title = 'Domaines d\'Intervention', 
    Content = 'Accompagnement dans la gestion des contrats de travail, procédures disciplinaires, négociations collectives, et conformité réglementaire.',
    Description = 'Champs d\'intervention spécialisés',
    UpdatedAt = GETUTCDATE()
WHERE [Key] = 'service_formation';

-- Service 3 - Accompagnement -> Honoraires
UPDATE Sections 
SET Title = 'Honoraires et Modalités', 
    Content = 'Tarifs adaptés selon la complexité du dossier et la durée d\'intervention. Devis personnalisé gratuit. Facturation transparente et détaillée.',
    Description = 'Conditions tarifaires et modalités',
    UpdatedAt = GETUTCDATE()
WHERE [Key] = 'service_accompagnement';

-- 4. AJOUTER DE NOUVELLES SECTIONS SPÉCIALISÉES
-- Nouvelle section : Consultante Droit Social
INSERT INTO Sections ([Key], Title, Content, Description, Category, SortOrder, IsActive, CreatedAt, UpdatedAt)
VALUES 
('cabinet_expertise', 'Consultante Droit Social', 'Spécialisée dans le conseil en droit social, je vous accompagne dans la résolution de vos problématiques RH et juridiques avec expertise et professionnalisme.', 'Présentation de l\'expertise en droit social', 'Cabinet', 6, 1, GETUTCDATE(), GETUTCDATE()),

('services_conformite', 'Conformité Réglementaire', 'Accompagnement dans la mise en conformité de vos pratiques RH avec la réglementation en vigueur. Audit et conseil personnalisé.', 'Service de conformité juridique', 'Services', 6, 1, GETUTCDATE(), GETUTCDATE()),

('services_formation_rh', 'Formation RH', 'Formations spécialisées en droit social pour vos équipes RH. Modules adaptés à vos besoins spécifiques et à votre secteur d\'activité.', 'Formations en ressources humaines', 'Services', 7, 1, GETUTCDATE(), GETUTCDATE());

-- 5. VÉRIFICATION DES MODIFICATIONS
-- Afficher toutes les sections par catégorie
SELECT Category, [Key], Title, Content, SortOrder 
FROM Sections 
WHERE Category IN ('Cabinet', 'Services') 
ORDER BY Category, SortOrder;
