# Script de sauvegarde des données importantes
$connectionString = "Server=(localdb)\MSSQLLocalDB;Database=KarimaDb;Trusted_Connection=true;MultipleActiveResultSets=true"

try {
    $connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $connection.Open()
    
    Write-Host "=== SAUVEGARDE DES DONNÉES ===" -ForegroundColor Green
    
    # Sauvegarder les utilisateurs
    Write-Host "Utilisateurs :" -ForegroundColor Yellow
    $usersQuery = "SELECT Id, Email, FirstName, LastName, IsAdmin FROM Users"
    $usersCommand = New-Object System.Data.SqlClient.SqlCommand($usersQuery, $connection)
    $usersReader = $usersCommand.ExecuteReader()
    while ($usersReader.Read()) {
        Write-Host "  ID: $($usersReader['Id']), Email: $($usersReader['Email']), Admin: $($usersReader['IsAdmin'])" -ForegroundColor Cyan
    }
    $usersReader.Close()
    
    # Sauvegarder les sections
    Write-Host "`nSections :" -ForegroundColor Yellow
    $sectionsQuery = "SELECT COUNT(*) as Count FROM Sections"
    $sectionsCommand = New-Object System.Data.SqlClient.SqlCommand($sectionsQuery, $connection)
    $sectionsCount = $sectionsCommand.ExecuteScalar()
    Write-Host "  Nombre de sections: $sectionsCount" -ForegroundColor Cyan
    
    # Sauvegarder les ServiceContents
    Write-Host "`nServiceContents :" -ForegroundColor Yellow
    $serviceQuery = "SELECT COUNT(*) as Count FROM ServiceContents"
    $serviceCommand = New-Object System.Data.SqlClient.SqlCommand($serviceQuery, $connection)
    $serviceCount = $serviceCommand.ExecuteScalar()
    Write-Host "  Nombre de ServiceContents: $serviceCount" -ForegroundColor Cyan
    
    Write-Host "`n=== SAUVEGARDE TERMINÉE ===" -ForegroundColor Green
    
} catch {
    Write-Host "Erreur : $($_.Exception.Message)" -ForegroundColor Red
} finally {
    if ($connection) { $connection.Close() }
}
