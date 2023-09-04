# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Generate a secret key

```openssl rand -base64 32```

## Prisma

### Generate Client

```npx prisma generate```

### Create Migration

```npx prisma migrate dev --name <name>```

### Run Migration

```npx prisma migrate dev```

## Local Development

### Postgres

```docker run -d --name postgres -e POSTGRES_PASSWORD=trading-journal -e POSTGRES_USER=trading-journal -e POSTGRES_DB=trading-journal -p 5432:5432 postgres```
