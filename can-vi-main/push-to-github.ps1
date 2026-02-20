# Script PowerShell pour pousser le projet vers GitHub
# Usage: .\push-to-github.ps1

Write-Host "🚀 Configuration GitHub pour CAN 2025 Morocco Hub" -ForegroundColor Cyan
Write-Host ""

# Demander le nom du repository
$repoName = Read-Host "Entrez le nom du repository GitHub (ex: can2025-morocco-hub)"

if ([string]::IsNullOrWhiteSpace($repoName)) {
    Write-Host "❌ Le nom du repository ne peut pas être vide!" -ForegroundColor Red
    exit 1
}

# Nom d'utilisateur GitHub
$username = "achmaouiayoub120-beep"
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "📋 Configuration:" -ForegroundColor Yellow
Write-Host "  Username: $username"
Write-Host "  Repository: $repoName"
Write-Host "  URL: $repoUrl"
Write-Host ""

$confirm = Read-Host "Confirmer? (O/N)"

if ($confirm -ne "O" -and $confirm -ne "o") {
    Write-Host "❌ Annulé" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "🔧 Configuration du remote..." -ForegroundColor Cyan

# Vérifier si le remote existe déjà
$existingRemote = git remote get-url origin 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "⚠️  Un remote 'origin' existe déjà: $existingRemote" -ForegroundColor Yellow
    $changeRemote = Read-Host "Voulez-vous le remplacer? (O/N)"
    if ($changeRemote -eq "O" -or $changeRemote -eq "o") {
        git remote remove origin
        Write-Host "✅ Remote existant supprimé" -ForegroundColor Green
    } else {
        Write-Host "❌ Annulé" -ForegroundColor Red
        exit 0
    }
}

# Ajouter le remote
git remote add origin $repoUrl

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote 'origin' ajouté avec succès" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de l'ajout du remote" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📤 Poussage du code vers GitHub..." -ForegroundColor Cyan
Write-Host ""

# Pousser vers GitHub
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Succès! Votre code est maintenant sur GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Repository: $repoUrl" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Erreur lors du push" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Solutions possibles:" -ForegroundColor Yellow
    Write-Host "  1. Vérifiez que le repository existe sur GitHub"
    Write-Host "  2. Vérifiez vos identifiants GitHub"
    Write-Host "  3. Utilisez un Personal Access Token si nécessaire"
    Write-Host ""
    exit 1
}

