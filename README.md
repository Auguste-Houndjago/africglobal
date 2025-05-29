# AfricGlobal

## Modifications Récentes

### Système d'Authentification et de Gestion des Rôles

Nous avons implémenté un système complet d'authentification et de gestion des rôles utilisateur intégrant Supabase et Prisma.

#### Fichiers Modifiés/Créés :

1. **`src/lib/prisma.ts`** (Nouveau)
   - Configuration du client Prisma
   - Gestion de l'instance Prisma en mode développement et production

2. **`src/utils/auth.ts`** (Modifié)
   - Intégration de Prisma dans la fonction `signUp`
   - Création automatique de l'utilisateur dans la base de données Prisma
   - Modification de la gestion des sessions utilisateur

3. **`src/components/ux/role-selector.tsx`** (Modifié)
   - Ajout de la gestion d'état pour le chargement
   - Intégration avec l'API de mise à jour des rôles
   - Gestion des notifications de succès/erreur
   - Redirection après sélection du rôle

4. **`src/app/api/user/role/route.ts`** (Nouveau)
   - Endpoint API pour la gestion des rôles
   - Logique de création/mise à jour des utilisateurs
   - Validation des rôles
   - Gestion des erreurs

#### Flux d'Authentification

1. L'utilisateur s'inscrit via le formulaire d'inscription
2. Un compte est créé dans Supabase
3. Un utilisateur correspondant est créé dans la base de données Prisma
4. L'utilisateur est redirigé vers la page de sélection de rôle
5. Le rôle choisi est enregistré dans la base de données
6. L'utilisateur est redirigé vers la page d'accueil

#### Structure de la Base de Données

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String?
  fullName  String
  role      Role     @default(investor)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  exporter
  investor
}
```

### Configuration Requise

1. Base de données PostgreSQL
2. Compte Supabase
3. Variables d'environnement :
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`

### Installation

```bash
pnpm install
npx prisma generate
npx prisma db push
```

### Développement

```bash
pnpm dev
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
