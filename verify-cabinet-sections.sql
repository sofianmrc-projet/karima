-- Requête pour vérifier les sections Cabinet dans la base de données
-- Cette requête permet de s'assurer que les sections sont bien présentes et actives

-- 1. Vérifier toutes les sections Cabinet
SELECT 
    Id,
    [Key],
    Title,
    Content,
    Category,
    SortOrder,
    IsActive,
    CreatedAt,
    UpdatedAt
FROM Sections 
WHERE Category = 'Cabinet'
ORDER BY SortOrder;

-- 2. Compter le nombre de sections par catégorie
SELECT 
    Category,
    COUNT(*) as NombreSections,
    SUM(CASE WHEN IsActive = 1 THEN 1 ELSE 0 END) as SectionsActives
FROM Sections 
GROUP BY Category
ORDER BY Category;

-- 3. Vérifier spécifiquement les sections principales du Cabinet
SELECT 
    [Key],
    Title,
    LEFT(Content, 100) + '...' as ContentPreview,
    IsActive
FROM Sections 
WHERE Category = 'Cabinet' 
    AND [Key] IN ('home_hero', 'home_hero_subtitle', 'home_hero_description', 'home_about', 'home_stats')
ORDER BY SortOrder;

-- 4. Vérifier les sections Services également
SELECT 
    [Key],
    Title,
    LEFT(Content, 100) + '...' as ContentPreview,
    IsActive
FROM Sections 
WHERE Category = 'Services'
ORDER BY SortOrder;
