# Script de test pour vérifier l'API
Write-Host "Test de l'API Karima..." -ForegroundColor Green

# Test 1: Vérifier si l'API répond
Write-Host "`n1. Test de l'endpoint de contenu public..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/Public/service-content" -Method GET
    Write-Host "✅ API accessible" -ForegroundColor Green
    Write-Host "Contenu reçu:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 2
} catch {
    Write-Host "❌ Erreur API: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Vérifiez que l'API est démarrée avec: cd api && dotnet run" -ForegroundColor Yellow
}

# Test 2: Vérifier Swagger
Write-Host "`n2. Test de Swagger..." -ForegroundColor Yellow
try {
    $swaggerResponse = Invoke-WebRequest -Uri "http://localhost:5000/swagger" -Method GET
    if ($swaggerResponse.StatusCode -eq 200) {
        Write-Host "✅ Swagger accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Swagger non accessible" -ForegroundColor Red
}

Write-Host "`nTest terminé!" -ForegroundColor Green
