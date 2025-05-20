# Turborepo starter with shadcn/ui

A full-stack monorepo template using:
- 🏎️ [Turborepo](https://turborepo.org/)
- ⚛️ [Next.js 15](https://nextjs.org/)
- 🔐 [Better Auth](https://better-auth.com/)
- 💾 [Drizzle ORM](https://orm.drizzle.team/)
- 🎨 [shadcn/ui](https://ui.shadcn.com/)
- 🎯 [Biome](https://biomejs.dev/)
- 🚀 [trpc](https://trpc.io/)


## Using this example

Clone the repository:

```bash
# clone repository
https://github.com/shanksxz/turborepo-shadcn-ui
cd turborepo-shadcn-ui

# install dependencies
pnpm install

# configure environment
cp .env.example .env
```

### Database setup
```bash
# generate schema
pnpm db:generate

# run migrations
pnpm db:migrate

# (Optional) Open Drizzle Studio
pnpm db:studio
```

### Start the development server

```bash
# start development server
pnpm dev

# format and lint
pnpm format-and-lint
pnpm format-and-lint:fix
```

### Add ui components

Use the pre-made script:

```sh
pnpm ui add <component-name>
```

## Project structure
```bash
├── apps/
│   └── web/              
├── packages/
│   ├── ui/              
│   ├── database/     
│   ├── typescript-config/
├── .env.example
├── biome.json
├── package.json
└── turbo.json
```

## Environment variables

```bash
DATABASE_URL=           # PostgreSQL connection URL
GITHUB_ID=             # GitHub OAuth ID
GITHUB_SECRET=         # GitHub OAuth Secret
BETTERAUTH_SECRET=       # NextAuth.js secret
BETTERAUTH_URL=          # NextAuth.js URL
```



## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `t3-with-trpc`: a [trpc](https://trpc.io/) example
- `@repo/ui`: a stub React component library (🚀 powered by **shadcn/ui**)
- `@repo/database`: a [Dirzzle](https://orm.drizzle.team/) client for PostgreSQL
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Biome](https://biomejs.dev/) for formatting and linting

### Build

To build all apps and packages, run the following command:

```sh
cd turborepo-shadcn-ui
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
cd turborepo-shadcn-ui
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd turborepo-shadcn-ui
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

Learn more about shadcn/ui:

- [Documentation](https://ui.shadcn.com/docs)
