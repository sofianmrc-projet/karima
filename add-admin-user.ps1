# Script pour ajouter l'utilisateur admin
$connectionString = "Server=(localdb)\MSSQLLocalDB;Database=KarimaDb;Trusted_Connection=true;MultipleActiveResultSets=true"

try {
    # Créer une connexion SQL
    $connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $connection.Open()
    
    # Vérifier si l'utilisateur existe déjà
    $checkQuery = "SELECT COUNT(*) FROM Users WHERE Email = 'admin@karima.com'"
    $checkCommand = New-Object System.Data.SqlClient.SqlCommand($checkQuery, $connection)
    $userExists = $checkCommand.ExecuteScalar()
    
    if ($userExists -eq 0) {
        # Ajouter l'utilisateur admin
        $insertQuery = @"
INSERT INTO Users (Id, Email, PasswordHash, FirstName, LastName, IsAdmin, CreatedAt) 
VALUES (1, 'admin@karima.com', 'admin', 'Admin', 'Karima', 1, '2025-09-11T00:00:00.0000000Z')
"@
        $insertCommand = New-Object System.Data.SqlClient.SqlCommand($insertQuery, $connection)
        $result = $insertCommand.ExecuteNonQuery()
        
        Write-Host "Utilisateur admin ajouté avec succès !" -ForegroundColor Green
    } else {
        Write-Host "L'utilisateur admin existe déjà." -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "Erreur : $($_.Exception.Message)" -ForegroundColor Red
} finally {
    if ($connection) {
        $connection.Close()
    }
}
