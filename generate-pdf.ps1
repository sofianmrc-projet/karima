# Script PowerShell pour générer un PDF à partir du Markdown
# Nécessite pandoc et wkhtmltopdf

param(
    [string]$InputFile = "DOCUMENTATION_TECHNIQUE_KARIMA.md",
    [string]$OutputFile = "DOCUMENTATION_TECHNIQUE_KARIMA.pdf"
)

Write-Host "🚀 Génération du PDF à partir du Markdown..." -ForegroundColor Green

# Vérifier si pandoc est installé
try {
    $pandocVersion = pandoc --version 2>$null
    Write-Host "✅ Pandoc trouvé: $($pandocVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "❌ Pandoc n'est pas installé. Veuillez l'installer depuis https://pandoc.org/installing.html" -ForegroundColor Red
    exit 1
}

# Vérifier si le fichier d'entrée existe
if (-not (Test-Path $InputFile)) {
    Write-Host "❌ Fichier d'entrée non trouvé: $InputFile" -ForegroundColor Red
    exit 1
}

# Générer le PDF avec pandoc
Write-Host "📄 Conversion en cours..." -ForegroundColor Yellow

$pandocArgs = @(
    $InputFile
    "-o", $OutputFile
    "--pdf-engine=wkhtmltopdf"
    "--css=style.css"
    "--toc"
    "--toc-depth=3"
    "--number-sections"
    "--highlight-style=tango"
    "--metadata", "title=Documentation Technique - Projet Karima"
    "--metadata", "author=Équipe de développement"
    "--metadata", "date=$(Get-Date -Format 'yyyy-MM-dd')"
)

try {
    & pandoc @pandocArgs
    Write-Host "✅ PDF généré avec succès: $OutputFile" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la génération du PDF: $($_.Exception.Message)" -ForegroundColor Red
    
    # Essayer avec une méthode alternative (HTML puis PDF)
    Write-Host "🔄 Tentative avec conversion HTML..." -ForegroundColor Yellow
    
    $htmlFile = $OutputFile -replace '\.pdf$', '.html'
    & pandoc $InputFile -o $htmlFile --toc --toc-depth=3 --number-sections --highlight-style=tango
    Write-Host "✅ HTML généré: $htmlFile" -ForegroundColor Green
    Write-Host "💡 Vous pouvez convertir le HTML en PDF avec votre navigateur (Ctrl+P > Enregistrer au format PDF)" -ForegroundColor Cyan
}

Write-Host "`n📋 Résumé:" -ForegroundColor Cyan
Write-Host "   - Fichier d'entrée: $InputFile" -ForegroundColor White
Write-Host "   - Fichier de sortie: $OutputFile" -ForegroundColor White
Write-Host "   - Taille du fichier: $((Get-Item $InputFile).Length) bytes" -ForegroundColor White

if (Test-Path $OutputFile) {
    Write-Host "   - PDF généré: $((Get-Item $OutputFile).Length) bytes" -ForegroundColor White
}
