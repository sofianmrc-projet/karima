-- Script SQL pour ajouter uniquement les sections de blog

-- Sections pour la page blog
INSERT INTO Section ([Key], Title, Content, Description, Category, SortOrder, IsActive, CreatedAt, UpdatedAt)
VALUES 
('blog_hero', 'Blog & Actualités', 'Découvrez nos derniers articles, conseils et réflexions sur l''excellence organisationnelle et le développement professionnel.', 'Titre principal de la page blog', 'Blog', 1, 1, GETDATE(), GETDATE()),
('blog_article_1', 'Les 5 clés du leadership moderne', 'Dans un monde en constante évolution, le leadership moderne nécessite de nouvelles compétences et approches. Découvrez les 5 clés essentielles pour devenir un leader efficace et inspirant.', 'Article sur le leadership', 'Blog', 2, 1, GETDATE(), GETDATE()),
('blog_article_2', 'Optimiser la performance de vos équipes', 'Comment créer un environnement de travail qui favorise la productivité et l''épanouissement de vos collaborateurs. Des stratégies éprouvées pour maximiser les résultats.', 'Article sur la performance des équipes', 'Blog', 3, 1, GETDATE(), GETDATE()),
('blog_article_3', 'La transformation digitale : par où commencer ?', 'La transformation digitale n''est pas qu''une question de technologie. C''est avant tout une transformation culturelle et organisationnelle. Nos conseils pour bien démarrer.', 'Article sur la transformation digitale', 'Blog', 4, 1, GETDATE(), GETDATE());

-- Vérification des sections de blog ajoutées
SELECT * FROM Section WHERE Category = 'Blog' ORDER BY SortOrder;
