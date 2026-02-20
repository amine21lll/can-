# Instructions pour ajouter le projet sur GitHub

## Étape 1 : Créer le repository sur GitHub

1. Allez sur https://github.com/new
2. Remplissez les informations :
   - **Repository name**: `can2025-morocco-hub` (ou le nom de votre choix)
   - **Description**: "Application web complète pour la CAN 2025 - Maroc (Next.js, React, 100% frontend)"
   - **Visibilité**: Public ou Private (selon votre préférence)
   - **⚠️ IMPORTANT**: Ne cochez PAS "Initialize this repository with a README" (on a déjà un README)
3. Cliquez sur **"Create repository"**

## Étape 2 : Ajouter le remote et pousser le code

Une fois le repository créé, GitHub vous donnera des instructions. Exécutez ces commandes dans votre terminal :

```bash
# Aller dans le dossier du projet
cd "C:\Users\ayoub\Downloads\can2025-vf-main (1)\can2025-vf-main"

# Ajouter le remote (remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/achmaouiayoub120-beep/can2025-morocco-hub.git

# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Pousser le code vers GitHub
git push -u origin main
```

## Étape 3 : Vérification

Après le push, votre code sera disponible sur :
**https://github.com/achmaouiayoub120-beep/can2025-morocco-hub**

## Commandes Git utiles pour la suite

```bash
# Voir l'état des fichiers modifiés
git status

# Ajouter des fichiers modifiés
git add .

# Faire un commit
git commit -m "Description des changements"

# Pousser vers GitHub
git push
```

## Note importante

Si vous utilisez HTTPS et que GitHub vous demande un token :
1. Allez dans GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Créez un nouveau token avec les permissions `repo`
3. Utilisez ce token comme mot de passe lors du `git push`

Ou utilisez GitHub CLI (`gh auth login`) pour une authentification plus simple.

