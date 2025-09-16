# Script PowerShell pour generer un PDF a partir du Markdown
# Necessite pandoc et wkhtmltopdf

param(
    [string]$InputFile = "DOCUMENTATION_TECHNIQUE_KARIMA.md",
    [string]$OutputFile = "DOCUMENTATION_TECHNIQUE_KARIMA.pdf"
)

Write-Host "🚀 Generation du PDF a partir du Markdown..." -ForegroundColor Green

# Verifier si pandoc est installe
try {
    $pandocVersion = pandoc --version 2>$null
    Write-Host "✅ Pandoc trouve: $($pandocVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "❌ Pandoc n'est pas installe. Veuillez l'installer depuis https://pandoc.org/installing.html" -ForegroundColor Red
    exit 1
}

# Verifier si le fichier d'entree existe
if (-not (Test-Path $InputFile)) {
    Write-Host "❌ Fichier d'entree non trouve: $InputFile" -ForegroundColor Red
    exit 1
}

# Generer le PDF avec pandoc
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
    "--metadata", "author=Equipe de developpement"
    "--metadata", "date=$(Get-Date -Format 'yyyy-MM-dd')"
)

try {
    & pandoc @pandocArgs
    Write-Host "✅ PDF genere avec succes: $OutputFile" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la generation du PDF: $($_.Exception.Message)" -ForegroundColor Red
    
    # Essayer avec une methode alternative (HTML puis PDF)
    Write-Host "🔄 Tentative avec conversion HTML..." -ForegroundColor Yellow
    
    $htmlFile = $OutputFile -replace '\.pdf$', '.html'
    & pandoc $InputFile -o $htmlFile --toc --toc-depth=3 --number-sections --highlight-style=tango
    Write-Host "✅ HTML genere: $htmlFile" -ForegroundColor Green
    Write-Host "💡 Vous pouvez convertir le HTML en PDF avec votre navigateur (Ctrl+P > Enregistrer au format PDF)" -ForegroundColor Cyan
}

Write-Host "`n📋 Resume:" -ForegroundColor Cyan
Write-Host "   - Fichier d'entree: $InputFile" -ForegroundColor White
Write-Host "   - Fichier de sortie: $OutputFile" -ForegroundColor White
Write-Host "   - Taille du fichier: $((Get-Item $InputFile).Length) bytes" -ForegroundColor White

if (Test-Path $OutputFile) {
    Write-Host "   - PDF genere: $((Get-Item $OutputFile).Length) bytes" -ForegroundColor White
}
