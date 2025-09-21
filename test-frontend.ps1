# Script de test pour vérifier le frontend
Write-Host "Test du frontend Karima..." -ForegroundColor Green

# Test 1: Vérifier si le frontend répond
Write-Host "`n1. Test de l'application React..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -Method GET
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Erreur Frontend: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Vérifiez que le frontend est démarré avec: cd web && npm run dev" -ForegroundColor Yellow
}

# Test 2: Vérifier l'API depuis le frontend
Write-Host "`n2. Test de l'API depuis le frontend..." -ForegroundColor Yellow
try {
    $apiResponse = Invoke-RestMethod -Uri "http://localhost:5173/api/Public/service-content" -Method GET
    Write-Host "✅ API accessible depuis le frontend" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur API depuis frontend: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Vérifiez la configuration du proxy dans vite.config.ts" -ForegroundColor Yellow
}

Write-Host "`nTest terminé!" -ForegroundColor Green
