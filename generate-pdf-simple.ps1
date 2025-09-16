# Script PowerShell simple pour generer un PDF
param(
    [string]$InputFile = "DOCUMENTATION_TECHNIQUE_KARIMA.md",
    [string]$OutputFile = "DOCUMENTATION_TECHNIQUE_KARIMA.pdf"
)

Write-Host "Generation du PDF..." -ForegroundColor Green

# Verifier pandoc
try {
    $pandocVersion = pandoc --version 2>$null
    Write-Host "Pandoc trouve: $($pandocVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "Pandoc n'est pas installe. Installez-le depuis https://pandoc.org/installing.html" -ForegroundColor Red
    exit 1
}

# Verifier le fichier d'entree
if (-not (Test-Path $InputFile)) {
    Write-Host "Fichier d'entree non trouve: $InputFile" -ForegroundColor Red
    exit 1
}

# Generer le PDF
Write-Host "Conversion en cours..." -ForegroundColor Yellow

try {
    pandoc $InputFile -o $OutputFile --toc --toc-depth=3 --number-sections --highlight-style=tango
    Write-Host "PDF genere avec succes: $OutputFile" -ForegroundColor Green
} catch {
    Write-Host "Erreur lors de la generation du PDF" -ForegroundColor Red
    
    # Alternative HTML
    $htmlFile = $OutputFile -replace '\.pdf$', '.html'
    pandoc $InputFile -o $htmlFile --toc --toc-depth=3 --number-sections --highlight-style=tango
    Write-Host "HTML genere: $htmlFile" -ForegroundColor Green
    Write-Host "Convertissez le HTML en PDF avec votre navigateur" -ForegroundColor Cyan
}

Write-Host "Resume:" -ForegroundColor Cyan
Write-Host "Fichier d'entree: $InputFile" -ForegroundColor White
Write-Host "Fichier de sortie: $OutputFile" -ForegroundColor White

if (Test-Path $InputFile) {
    $fileSize = (Get-Item $InputFile).Length
    Write-Host "Taille du fichier: $fileSize bytes" -ForegroundColor White
}

if (Test-Path $OutputFile) {
    $pdfSize = (Get-Item $OutputFile).Length
    Write-Host "PDF genere: $pdfSize bytes" -ForegroundColor White
}
