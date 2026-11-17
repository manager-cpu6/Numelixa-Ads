# NUMELIXA ADS

Standalone Numelixa-owned publisher monetization platform. There is no public advertiser marketplace or public advertiser campaign signup.

## Implemented in the foundation branch
- Next.js App Router + TypeScript, MongoDB connection layer and unique database indexes.
- Publisher registration/login with bcrypt password hashes and signed HTTP-only sessions.
- Admin role cannot be obtained through public registration. First admin is created through a one-time secret-protected bootstrap flow and exact email allowlist.
- Publisher dashboard and website management.
- Unique domain verification via DNS TXT, downloadable HTML file and meta tag; server-side checks.
- Admin review queue, approve/reject/request-changes workflow and automatic five-zone creation after approval.
- Copyable installation snippets and a domain-routed SDK endpoint.
- Admin-only campaign creation, scheduling, pause/resume/delete, HTML mini-ad builder with eight Numelixa templates, live desktop/mobile previews, image/video uploads to a dedicated Vercel Blob store.
- Ad serving checks approved website, website/zone relationship, publisher match, request origin, format, campaign schedule and target selectors.
- Public developer docs and initial admin/publisher dashboards.
- Event endpoint deduplicates event IDs but deliberately stores browser events as untrusted.

## Not yet production complete
The production-grade fraud and bot detection pipeline, signed click redirects, server-validated impression accounting, real frequency capping, API key lifecycle/rate limits, webhooks, country/device analytics, full video overlay controls, creative edit/duplicate UX, financial ledger and withdrawals are not yet finished. Publisher earnings remain disabled. Do not use client-originated events to calculate payouts.

## Required Vercel environment
- MONGODB_URI — a dedicated MongoDB Atlas connection string for the separate numelixa_ads database.
- MONGODB_DB=numelixa_ads
- SESSION_SECRET — 32+ random characters (already provisioned in the dedicated Vercel project).
- NUMELIXA_ADS_ADMIN_EMAILS — exact authorized administrator email(s).
- ADMIN_BOOTSTRAP_SECRET — a strong one-time secret of at least 32 characters.
- BLOB_READ_WRITE_TOKEN — provisioned by the dedicated public Vercel Blob store.
- NEXT_PUBLIC_APP_URL=https://publisher.virtunumber.online

Create the first admin at /bootstrap after configuring the email allowlist and bootstrap secret. The bootstrap endpoint closes after one admin exists.

## Local development
Copy .env.example to .env.local, then run npm install, npm run typecheck and npm run build.

Never reuse Virt-num production secrets or connect this project to the existing Numelixa website database.