# SpardhaHub — Landing Page PRD

## Problem Statement
Ultra-premium dark cinematic landing page for "SpardhaHub" — India's #1 exam preparation platform. Tagline: "Your Goal. Our Path." Brand: navy #1a1a2e bg, gold #EF9F27 accent, purple #7F77DD interactive. Netflix/Hotstar aesthetic, glassmorphism, premium spacing.

## Architecture
- Backend: FastAPI + Motor (MongoDB). Single resource: `signups` (email capture).
- Frontend: React 19 + Tailwind + framer-motion + lucide-react + sonner + shadcn Dialog.
- Sections: Navbar → Hero → CountdownStrip → StatsBar → Features → ClosingCTA → Footer.

## Endpoints
- GET `/api/` — health
- POST `/api/signup` — `{email, source?}` idempotent by email
- GET `/api/signup/count`
- GET `/api/signups?limit=`

## Implemented (2026-06-23)
- Hero with serif "Crack UPSC, MPSC, CA & More" + gold gradient + animated stars/grid/glows background
- Email signup form (hero + closing CTA) writing to MongoDB
- Watch Demo modal (shadcn Dialog) with styled YouTube placeholder
- UPSC/MPSC/SSC live countdowns to 2026 exam dates
- 6 glassmorphism feature cards
- Stats bar (50L+ / 9 / 3 / Free)
- Footer + navbar with mobile menu

## Tested
- Backend: 4/4 endpoints pass (incl. idempotency, 422 on invalid email)
- Frontend: all flows pass; invalid-email toast fixed via `noValidate` form

## Backlog / Next
- P1: Real demo video integration (currently placeholder)
- P1: Multilingual toggle (Eng/Hindi/Marathi)
- P2: Auth (Emergent Google login) to gate dashboard
- P2: Vacancy tracker live data feed
