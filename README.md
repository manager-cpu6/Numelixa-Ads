# NUMELIXA ADS

Standalone Numelixa-owned publisher monetization platform. There is no public advertiser marketplace or advertiser campaign signup.

## Foundation stage in this branch
- Next.js App Router, TypeScript and MongoDB access layer
- Signed HTTP-only sessions and bcrypt password hashes
- Public publisher registration/login; public registration can never grant admin privileges
- One-time admin bootstrap protected by a separate secret and email allowlist
- Website onboarding with unique tokens; server-side DNS TXT, HTML file and meta tag checks
- Admin review queue and automatic five-zone creation after approval
- Publisher/admin dashboards and basic database-backed views
- Ad retrieval and untrusted event-ingestion baseline

## Not yet production complete
Campaign/creative/video builder, media pipeline, CDN SDK, signed click redirects, bot/fraud detection, trusted impression validation, API keys, webhooks, rate limits, aggregate reporting, financial ledger and withdrawals remain future stages. Browser-originated events are deliberately stored as untrusted and cannot fund publisher revenue.

## Environment
Copy .env.example to .env.local. Use a dedicated MongoDB database and a separate Vercel project. Set NUMELIXA_ADS_ADMIN_EMAILS to exact admin email(s), ADMIN_BOOTSTRAP_SECRET to a strong one-time secret, and SESSION_SECRET to 32+ random characters. Register your admin email as a normal publisher first, then POST to /api/admin/bootstrap with email, password and secret. Bootstrap is disabled after the first admin is created.

Never reuse Virt-num production secrets.