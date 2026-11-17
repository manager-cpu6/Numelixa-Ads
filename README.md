# NUMELIXA ADS

A standalone, first-party publisher monetization platform. All advertising inventory and creatives are owned and controlled by Numelixa administrators; there is no public advertiser marketplace.

## Architecture

- Next.js App Router + TypeScript
- MongoDB Atlas for application data
- Signed, HTTP-only session cookies
- Server-side role checks; admin emails configured with `NUMELIXA_ADS_ADMIN_EMAILS`
- Separate Vercel project and environment variables from Numelixa's existing website

## Local development

1. Copy `.env.example` to `.env.local` and fill every required secret.
2. `npm install`
3. `npm run dev`

Never deploy with placeholder secrets. DNS ownership checks must be performed from the server. Publisher event requests are treated as untrusted until validated and deduplicated server-side.

## Deployment

Create a dedicated Vercel project connected only to `manager-cpu6/Numelixa-Ads`. Add the five requested subdomains as domains/routing aliases after DNS is configured. Production activation requires a real MongoDB database, strong session secret, and explicit admin email allowlist.
