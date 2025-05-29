# Convention de Commits

Ce document définit les règles pour écrire des messages de commit cohérents et informatifs.

## Format

```
<type>(<portée>): <description>

[corps]

[pied de page]
```

## Types

- **feat**: Nouvelle fonctionnalité
- **fix**: Correction de bug
- **docs**: Modification de la documentation
- **style**: Changements de formatage (espaces, points-virgules, etc.)
- **refactor**: Refactorisation du code
- **test**: Ajout ou modification de tests
- **chore**: Tâches de maintenance, mises à jour de dépendances

## Portées (Scopes)

- **auth**: Authentification
- **api**: API endpoints
- **ui**: Interface utilisateur
- **db**: Base de données
- **config**: Configuration
- **deps**: Dépendances
- **core**: Fonctionnalités principales

## Exemples

```
feat(auth): ajouter la sélection de rôle utilisateur

- Ajout du composant RoleSelector
- Intégration avec l'API de mise à jour des rôles
- Redirection après sélection
```

```
fix(api): corriger la gestion des erreurs dans l'API des rôles

- Ajout de la vérification d'existence de l'utilisateur
- Gestion des cas où l'utilisateur n'existe pas dans Prisma
```

```
refactor(auth): simplifier la logique d'authentification

- Suppression du code redondant
- Amélioration de la gestion des sessions
```

## Règles Importantes

1. La première ligne ne doit pas dépasser 72 caractères
2. La description doit être à l'infinitif
3. La description doit commencer par une minuscule
4. Pas de point à la fin de la description
5. Le corps du commit doit expliquer le "pourquoi" plutôt que le "comment"
6. Utiliser des listes à puces pour le corps du commit

## Messages à Éviter

❌ "fix bug"  
❌ "update"  
❌ "modifications diverses"  

✅ "fix(auth): corriger la validation du formulaire de connexion"  
✅ "feat(ui): ajouter le composant de sélection de rôle"  
✅ "refactor(api): simplifier la logique de gestion des rôles" 