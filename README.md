# NOCTURNE Hookah Market

Next.js storefront foundation with a premium dark visual system, local cart and age gate, catalogue filtering, product pages, responsive checkout, account surface, and admin import interface.

## Run locally

```bash
npm install
npm run dev
```

For production, use the standard `npm run build` build command and `npm run start` start command. The application does not run database generation, migrations, or an external service during its build step.

## Production integrations

The supplied UI intentionally uses a local catalogue fixture for preview and has **no database client in the runtime dependency tree**, so it can deploy without a `DATABASE_URL`. The `prisma/schema.prisma` file is a reference schema for a future database integration. Add `prisma` and `@prisma/client` only when a deployment environment has access to those packages and `DATABASE_URL` is configured. Authentication, payments, uploads, CSV persistence, and admin authorization must be server-side integrations; no credentials are included in the client.
