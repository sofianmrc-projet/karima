-- Script SQL pour ajouter seulement les informations de contact Footer
-- (en gardant les 3 sections existantes)

-- Sections manquantes pour le footer (seulement les infos de contact)
INSERT INTO Sections ([Key], Title, Content, Description, Category, SortOrder, IsActive, CreatedAt, UpdatedAt)
VALUES 
('footer_email', 'Email Footer', 'contact@karima.fr', 'Email de contact dans le footer', 'Footer', 4, 1, GETUTCDATE(), GETUTCDATE()),
('footer_phone', 'Téléphone Footer', '01 23 45 67 89', 'Téléphone de contact dans le footer', 'Footer', 5, 1, GETUTCDATE(), GETUTCDATE()),
('footer_address', 'Adresse Footer', '123 Avenue des Champs, 75008 Paris', 'Adresse de contact dans le footer', 'Footer', 6, 1, GETUTCDATE(), GETUTCDATE());

-- Vérification de toutes les sections footer (existantes + nouvelles)
SELECT * FROM Sections WHERE Category = 'Footer' ORDER BY SortOrder;
