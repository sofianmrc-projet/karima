# Script pour ajouter des sections pour toutes les catégories

Write-Host "Ajout des sections pour toutes les catégories..." -ForegroundColor Green

# URL de l'API
$apiUrl = "http://localhost:5000/api/sections/admin"

# Sections pour la page d'accueil
$homeSections = @(
    @{
        key = "home_hero"
        title = "Bienvenue chez Karima"
        content = "Votre partenaire de confiance pour des solutions innovantes et personnalisées qui transforment votre organisation."
        description = "Titre principal de la page d'accueil"
        category = "Accueil"
        sortOrder = 1
        isActive = $true
    },
    @{
        key = "home_about"
        title = "À propos de nous"
        content = "Depuis plus de 10 ans, nous accompagnons les organisations dans leur transformation et leur développement avec passion et expertise."
        description = "Section à propos sur la page d'accueil"
        category = "Accueil"
        sortOrder = 2
        isActive = $true
    },
    @{
        key = "home_services"
        title = "Nos services"
        content = "Des solutions complètes pour répondre à tous vos besoins professionnels et vous accompagner vers l'excellence."
        description = "Section services sur la page d'accueil"
        category = "Accueil"
        sortOrder = 3
        isActive = $true
    },
    @{
        key = "home_contact"
        title = "Contactez-nous"
        content = "Prêt à transformer votre organisation ? Contactez-nous dès aujourd'hui pour discuter de vos besoins."
        description = "Section contact sur la page d'accueil"
        category = "Accueil"
        sortOrder = 4
        isActive = $true
    }
)

# Sections pour la page services
$servicesSections = @(
    @{
        key = "services_hero"
        title = "Nos Services"
        content = "Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels et vous accompagner vers l'excellence."
        description = "Titre principal de la page services"
        category = "Services"
        sortOrder = 1
        isActive = $true
    },
    @{
        key = "services_consulting"
        title = "Consulting stratégique"
        content = "Accompagnement personnalisé pour optimiser vos processus, améliorer vos performances et atteindre vos objectifs stratégiques."
        description = "Service de consulting"
        category = "Services"
        sortOrder = 2
        isActive = $true
    },
    @{
        key = "services_formation"
        title = "Formation professionnelle"
        content = "Formations sur mesure pour développer les compétences de vos équipes et renforcer leur expertise dans leur domaine."
        description = "Service de formation"
        category = "Services"
        sortOrder = 3
        isActive = $true
    },
    @{
        key = "services_accompagnement"
        title = "Accompagnement continu"
        content = "Support continu pour assurer la réussite de vos projets et transformations, avec un suivi personnalisé et adapté."
        description = "Service d'accompagnement"
        category = "Services"
        sortOrder = 4
        isActive = $true
    }
)

# Sections pour la page à propos
$aboutSections = @(
    @{
        key = "about_hero"
        title = "À propos de Karima"
        content = "Découvrez notre histoire, nos valeurs et notre mission. Une équipe passionnée au service de votre réussite."
        description = "Titre principal de la page à propos"
        category = "À propos"
        sortOrder = 1
        isActive = $true
    },
    @{
        key = "about_histoire"
        title = "Notre histoire"
        content = "Fondée en 2013, Karima est née de la volonté de créer un cabinet de conseil différent, centré sur l'humain et l'innovation."
        description = "Histoire de l'entreprise"
        category = "À propos"
        sortOrder = 2
        isActive = $true
    },
    @{
        key = "about_valeurs"
        title = "Nos valeurs"
        content = "L'excellence, l'innovation, l'humain et l'intégrité sont les valeurs fondamentales qui guident chacune de nos actions."
        description = "Valeurs de l'entreprise"
        category = "À propos"
        sortOrder = 3
        isActive = $true
    },
    @{
        key = "about_mission"
        title = "Notre mission"
        content = "Transformer les organisations en révélant leur potentiel unique et en développant les compétences de leurs équipes."
        description = "Mission de l'entreprise"
        category = "À propos"
        sortOrder = 4
        isActive = $true
    }
)

# Sections pour la page blog
$blogSections = @(
    @{
        key = "blog_hero"
        title = "Blog & Actualités"
        content = "Découvrez nos derniers articles, conseils et réflexions sur l'excellence organisationnelle et le développement professionnel."
        description = "Titre principal de la page blog"
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
    }
)

# Fonction pour ajouter une section
function Add-Section {
    param($section)
    
    try {
        $body = $section | ConvertTo-Json -Depth 10
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Body $body -ContentType "application/json"
        Write-Host "✅ Section ajoutée: $($section.title) ($($section.category))" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "❌ Erreur pour $($section.title): $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Ajouter toutes les sections
Write-Host "`n📝 Ajout des sections Accueil..." -ForegroundColor Yellow
foreach ($section in $homeSections) {
    Add-Section -section $section
}

Write-Host "`n⚙️ Ajout des sections Services..." -ForegroundColor Yellow
foreach ($section in $servicesSections) {
    Add-Section -section $section
}

Write-Host "`n👥 Ajout des sections À propos..." -ForegroundColor Yellow
foreach ($section in $aboutSections) {
    Add-Section -section $section
}

Write-Host "`n📝 Ajout des sections Blog..." -ForegroundColor Yellow
foreach ($section in $blogSections) {
    Add-Section -section $section
}

Write-Host "`n🎉 Toutes les sections ont été ajoutées !" -ForegroundColor Green
Write-Host "Vous pouvez maintenant voir toutes les catégories dans la gestion du contenu." -ForegroundColor Cyan
