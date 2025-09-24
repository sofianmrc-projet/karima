-- Script SQL pour ajouter les sections Footer manquantes
-- Basé sur la structure réelle de la base de données

-- Sections pour le footer
INSERT INTO Sections ([Key], Title, Content, Description, Category, SortOrder, IsActive, CreatedAt, UpdatedAt)
VALUES 
('footer_description', 'Description Footer', 'Votre partenaire de confiance pour des services professionnels de qualité. Nous nous engageons à vous offrir des solutions adaptées à vos besoins.', 'Description de l''entreprise dans le footer', 'Footer', 1, 1, GETUTCDATE(), GETUTCDATE()),
('footer_email', 'Email Footer', 'contact@karima.fr', 'Email de contact dans le footer', 'Footer', 2, 1, GETUTCDATE(), GETUTCDATE()),
('footer_phone', 'Téléphone Footer', '01 23 45 67 89', 'Téléphone de contact dans le footer', 'Footer', 3, 1, GETUTCDATE(), GETUTCDATE()),
('footer_address', 'Adresse Footer', '123 Avenue des Champs, 75008 Paris', 'Adresse de contact dans le footer', 'Footer', 4, 1, GETUTCDATE(), GETUTCDATE()),
('footer_links_title', 'Titre Liens Footer', 'Liens rapides', 'Titre de la section liens dans le footer', 'Footer', 5, 1, GETUTCDATE(), GETUTCDATE()),
('footer_services_title', 'Titre Services Footer', 'Nos services', 'Titre de la section services dans le footer', 'Footer', 6, 1, GETUTCDATE(), GETUTCDATE()),
('footer_service_1', 'Service 1 Footer', 'Consulting', 'Premier service dans le footer', 'Footer', 7, 1, GETUTCDATE(), GETUTCDATE()),
('footer_service_2', 'Service 2 Footer', 'Formation', 'Deuxième service dans le footer', 'Footer', 8, 1, GETUTCDATE(), GETUTCDATE()),
('footer_service_3', 'Service 3 Footer', 'Accompagnement', 'Troisième service dans le footer', 'Footer', 9, 1, GETUTCDATE(), GETUTCDATE()),
('footer_service_4', 'Service 4 Footer', 'Audit', 'Quatrième service dans le footer', 'Footer', 10, 1, GETUTCDATE(), GETUTCDATE());

-- Vérification des sections footer ajoutées
SELECT * FROM Sections WHERE Category = 'Footer' ORDER BY SortOrder;
