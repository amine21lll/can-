# CAN 2025 - Morocco Hub

Application web complète et professionnelle pour la Coupe d'Afrique des Nations CAN 2025 – Maroc, utilisant Next.js / React, 100% frontend, sans base de données, avec un fake backend basé sur localStorage.

## 🎯 Fonctionnalités

- 🏠 **Page d'accueil** avec hero section, compte à rebours et présentation du tournoi
- ⚽ **Matchs** - Liste des matchs avec filtres et calendrier
- 🎟️ **Billetterie** - Réservation de billets (simulation avec localStorage)
- 🤝 **Bénévoles** - Formulaire de candidature avec validation complète
- 🏢 **Partenaires** - Grille responsive des partenaires officiels et sponsors
- 🧑‍💼 **Dashboard Admin** - Gestion complète des bénévoles (approuver/refuser)
- 🎨 **Design moderne** - UI/UX professionnelle avec Tailwind CSS

## 🚀 Technologies

- **Framework**: Next.js 16
- **UI**: React 19, Tailwind CSS
- **Stockage**: localStorage (100% frontend)
- **Composants**: Radix UI, Lucide Icons
- **TypeScript**: Typage complet

## 📦 Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Build de production
pnpm build

# Démarrer en production
pnpm start
```

## 🏗️ Structure du projet

```
├── app/                    # Pages Next.js
│   ├── admin/              # Dashboard admin
│   ├── matches/            # Page des matchs
│   ├── tickets/            # Billetterie
│   ├── volunteers/         # Page bénévoles
│   └── partners/           # Page partenaires
├── components/             # Composants React
│   ├── ui/                 # Composants UI réutilisables
│   ├── volunteers/         # Composants bénévoles
│   ├── partners/           # Composants partenaires
│   └── gallery/            # Composants galerie
├── hooks/                  # Hooks React personnalisés
├── lib/                    # Utilitaires et helpers
└── public/                 # Assets statiques
```

## 🎨 Fonctionnalités principales

### Gestion des bénévoles
- Formulaire avec validation complète (email, téléphone marocain)
- Stockage dans localStorage
- Dashboard admin avec actions (approuver/refuser)
- Données de test par défaut (6 bénévoles)

### Grille d'images responsive
- Composant réutilisable `ImageGrid`
- Responsive (4/2/1 colonnes)
- Lazy loading et optimisations
- Effets hover modernes

### Partenaires & Sponsors
- Grille de logos avec effet grayscale → couleur
- Design moderne et professionnel
- Responsive et accessible

## 🌐 Déploiement

Le projet est prêt pour le déploiement sur Vercel :

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement Next.js
3. Le projet sera déployé automatiquement

## 📝 Objectif pédagogique

Ce projet simule un backend réel mais fonctionne 100% frontend, idéal pour :
- Projet scolaire Web 1 / Web 2
- Démonstration devant professeur
- Tests sans base de données
- Déploiement Vercel sans configuration serveur

## 👤 Auteur

**ANNOUKA MOHAMED AMINE**
- GitHub: (https://github.com/amine21lll))

## 📄 Licence

Projet universitaire - Web 1 & Web 2

---

**CAN 2025 – Morocco** 🇲🇦 ⚽
