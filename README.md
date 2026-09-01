# NOCTURNE Hookah Market

Next.js storefront foundation with a premium dark visual system, local cart and age gate, catalogue filtering, product pages, responsive checkout, account surface, and admin import interface.

## Run locally

```bash
npm install
npm run dev
```

## Production integrations

The supplied UI intentionally uses a local catalogue fixture for preview. Set `DATABASE_URL` and extend the Prisma models/migrations before deploying. Authentication, payments, uploads, CSV persistence, and admin authorization must be server-side integrations; no credentials are included in the client.
