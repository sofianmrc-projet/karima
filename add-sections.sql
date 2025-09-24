-- Script SQL pour ajouter toutes les sections dans la base de données

-- Sections pour la page d'accueil
INSERT INTO Sections (Key, Title, Content, Description, Category, SortOrder, IsActive, CreatedAt, UpdatedAt)
VALUES 
('home_hero', 'Bienvenue chez Karima', 'Votre partenaire de confiance pour des solutions innovantes et personnalisées qui transforment votre organisation.', 'Titre principal de la page d''accueil', 'Accueil', 1, 1, GETDATE(), GETDATE()),
('home_about', 'À propos de nous', 'Depuis plus de 10 ans, nous accompagnons les organisations dans leur transformation et leur développement avec passion et expertise.', 'Section à propos sur la page d''accueil', 'Accueil', 2, 1, GETDATE(), GETDATE()),
('home_services', 'Nos services', 'Des solutions complètes pour répondre à tous vos besoins professionnels et vous accompagner vers l''excellence.', 'Section services sur la page d''accueil', 'Accueil', 3, 1, GETDATE(), GETDATE()),
('home_contact', 'Contactez-nous', 'Prêt à transformer votre organisation ? Contactez-nous dès aujourd''hui pour discuter de vos besoins.', 'Section contact sur la page d''accueil', 'Accueil', 4, 1, GETDATE(), GETDATE());

-- Sections pour la page services
INSERT INTO Sections (Key, Title, Content, Description, Category, SortOrder, IsActive, CreatedAt, UpdatedAt)
VALUES 
('services_hero', 'Nos Services', 'Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels et vous accompagner vers l''excellence.', 'Titre principal de la page services', 'Services', 1, 1, GETDATE(), GETDATE()),
('services_consulting', 'Consulting stratégique', 'Accompagnement personnalisé pour optimiser vos processus, améliorer vos performances et atteindre vos objectifs stratégiques.', 'Service de consulting', 'Services', 2, 1, GETDATE(), GETDATE()),
('services_formation', 'Formation professionnelle', 'Formations sur mesure pour développer les compétences de vos équipes et renforcer leur expertise dans leur domaine.', 'Service de formation', 'Services', 3, 1, GETDATE(), GETDATE()),
('services_accompagnement', 'Accompagnement continu', 'Support continu pour assurer la réussite de vos projets et transformations, avec un suivi personnalisé et adapté.', 'Service d''accompagnement', 'Services', 4, 1, GETDATE(), GETDATE());

-- Sections pour la page à propos
INSERT INTO Sections (Key, Title, Content, Description, Category, SortOrder, IsActive, CreatedAt, UpdatedAt)
VALUES 
('about_hero', 'À propos de Karima', 'Découvrez notre histoire, nos valeurs et notre mission. Une équipe passionnée au service de votre réussite.', 'Titre principal de la page à propos', 'À propos', 1, 1, GETDATE(), GETDATE()),
('about_histoire', 'Notre histoire', 'Fondée en 2013, Karima est née de la volonté de créer un cabinet de conseil différent, centré sur l''humain et l''innovation.', 'Histoire de l''entreprise', 'À propos', 2, 1, GETDATE(), GETDATE()),
('about_valeurs', 'Nos valeurs', 'L''excellence, l''innovation, l''humain et l''intégrité sont les valeurs fondamentales qui guident chacune de nos actions.', 'Valeurs de l''entreprise', 'À propos', 3, 1, GETDATE(), GETDATE()),
('about_mission', 'Notre mission', 'Transformer les organisations en révélant leur potentiel unique et en développant les compétences de leurs équipes.', 'Mission de l''entreprise', 'À propos', 4, 1, GETDATE(), GETDATE());

-- Sections pour la page blog
INSERT INTO Sections (Key, Title, Content, Description, Category, SortOrder, IsActive, CreatedAt, UpdatedAt)
VALUES 
('blog_hero', 'Blog & Actualités', 'Découvrez nos derniers articles, conseils et réflexions sur l''excellence organisationnelle et le développement professionnel.', 'Titre principal de la page blog', 'Blog', 1, 1, GETDATE(), GETDATE()),
('blog_article_1', 'Les 5 clés du leadership moderne', 'Dans un monde en constante évolution, le leadership moderne nécessite de nouvelles compétences et approches. Découvrez les 5 clés essentielles pour devenir un leader efficace et inspirant.', 'Article sur le leadership', 'Blog', 2, 1, GETDATE(), GETDATE()),
('blog_article_2', 'Optimiser la performance de vos équipes', 'Comment créer un environnement de travail qui favorise la productivité et l''épanouissement de vos collaborateurs. Des stratégies éprouvées pour maximiser les résultats.', 'Article sur la performance des équipes', 'Blog', 3, 1, GETDATE(), GETDATE()),
('blog_article_3', 'La transformation digitale : par où commencer ?', 'La transformation digitale n''est pas qu''une question de technologie. C''est avant tout une transformation culturelle et organisationnelle. Nos conseils pour bien démarrer.', 'Article sur la transformation digitale', 'Blog', 4, 1, GETDATE(), GETDATE());

-- Vérification des données insérées
SELECT Category, COUNT(*) as NombreSections 
FROM Sections 
GROUP BY Category 
ORDER BY Category;
