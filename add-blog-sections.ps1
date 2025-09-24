# Script pour ajouter des sections de blog à la base de données

Write-Host "Ajout des sections de blog..." -ForegroundColor Green

# URL de l'API
$apiUrl = "http://localhost:5000/api/sections/admin"

# Données des sections de blog
$blogSections = @(
    @{
        key = "blog_hero"
        title = "Blog & Actualités"
        content = "Découvrez nos derniers articles, conseils et réflexions sur l'excellence organisationnelle et le développement professionnel."
        description = "Page principale du blog"
        category = "Blog"
        sortOrder = 1
        isActive = $true
    },
    @{
        key = "blog_article_1"
        title = "Les 5 clés du leadership moderne"
        content = "Dans un monde en constante évolution, le leadership moderne nécessite de nouvelles compétences et approches. Découvrez les 5 clés essentielles pour devenir un leader efficace et inspirant."
        description = "Article sur le leadership"
        category = "Blog"
        sortOrder = 2
        isActive = $true
    },
    @{
        key = "blog_article_2"
        title = "Optimiser la performance de vos équipes"
        content = "Comment créer un environnement de travail qui favorise la productivité et l'épanouissement de vos collaborateurs. Des stratégies éprouvées pour maximiser les résultats."
        description = "Article sur la performance des équipes"
        category = "Blog"
        sortOrder = 3
        isActive = $true
    },
    @{
        key = "blog_article_3"
        title = "La transformation digitale : par où commencer ?"
        content = "La transformation digitale n'est pas qu'une question de technologie. C'est avant tout une transformation culturelle et organisationnelle. Nos conseils pour bien démarrer."
        description = "Article sur la transformation digitale"
        category = "Blog"
        sortOrder = 4
        isActive = $true
    },
    @{
        key = "blog_newsletter"
        title = "Restez informé"
        content = "Abonnez-vous à notre newsletter pour recevoir nos derniers articles et conseils directement dans votre boîte mail."
        description = "Section newsletter"
        category = "Blog"
        sortOrder = 5
        isActive = $true
    }
)

# Fonction pour ajouter une section
function Add-Section {
    param($section)
    
    try {
        $body = $section | ConvertTo-Json -Depth 10
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Body $body -ContentType "application/json"
        Write-Host "✅ Section ajoutée: $($section.title)" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "❌ Erreur pour $($section.title): $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Ajouter chaque section
foreach ($section in $blogSections) {
    Add-Section -section $section
}

Write-Host "`n🎉 Sections de blog ajoutées avec succès !" -ForegroundColor Green
Write-Host "Vous pouvez maintenant voir les sections dans la gestion du contenu." -ForegroundColor Cyan
