# HotelLendingAI

## Description
A Next.js POC for an AI-powered hotel loan monitoring system — described internally as an "AI Operating System for hotel lending." The system simulates how AI agents handle the full monthly lifecycle of a hotel loan: collecting borrower documents, standardizing them to USALI accounting standards, verifying data against bank feeds, and monitoring covenant compliance — all with minimal human involvement.

## Problem & Audience
US hotel lenders manage tens of billions in hotel debt via emails, PDFs, and Excel. The core pain is a **processing bottleneck** — manual data entry means financials aren't actionable until weeks after submission, by which time a healthy loan can already be drifting into distress. This tool addresses that gap with an autonomous monitoring layer.

## Status
🟡 **POC / Demo** — built to demonstrate Level 3 Autonomy (human-in-the-loop)

## Key Features
- **Collection Agent:** Automated document chase from borrowers
- **Standardization Agent:** Maps hotel P&L data to USALI standards
- **Verification Agent:** Cross-references financials with bank feed data to detect fraud/anomalies
- **Compliance Agent:** Real-time covenant monitoring with confidence scoring
- Handles "messy" / non-standard reporting gracefully instead of rejecting it
- Confidence-weighted conclusions with targeted human escalation
- Recharts-powered data visualizations
- XLSX export of reports
- Access code gating (demo protection)

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| AI | Google Generative AI (`@google/generative-ai`) |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Validation | Zod |
| Export | xlsx |
| Utilities | uuid |

## How to Run
```bash
npm install
npm run dev       # development server at localhost:3000
npm run build     # production build
npm run start     # production server
```
Requires a Google AI API key in `.env`.

## Architecture Notes
- Agent-based architecture: ephemeral agents spawn for discrete tasks (e.g., doc standardization) and dissolve — designed to scale compute efficiently
- App Router with route groups: `access-code`, `actions`, `api`, `dashboard`, `sandbox`, `v1`, `v2`
- AI layer uses Google Gemini for document parsing and confidence scoring
- `check-models.ts` script for verifying available AI model versions
- No traditional ETL pipeline — agents triangulate across imperfect data sources like a credit analyst would

## Demo / Deployment
🔒 Demo-gated (access code required). Local or Vercel deployment.

## Date Built
~Early 2026

## Next Steps / What's Left
- Progress from Level 3 to Level 5 autonomy (fully autonomous, humans only handle structural edge cases)
- Integrate real bank feed APIs
- Build long-term property-specific pattern learning
- Production auth layer to replace the access code gate
