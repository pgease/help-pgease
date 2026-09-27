# PG Ease Help & Learning Hub (`help.pgease.in`)

Official video tutorials, knowledge base, and developer deep-link portal for PG Ease Coliving & Hostel ERP.

## Features
- **Video Masterclasses**: Responsive 16:9 cinematic YouTube video player for tenant onboarding, direct UPI rent collection, digital Aadhaar KYC, staff roles, room pricing, and complaints desk.
- **Deep-Link Routing**: Supports direct URL slugs matching API technical keys:
  - `help.pgease.in/tenant_add`
  - `help.pgease.in/rent_collection`
  - `help.pgease.in/room_management`
  - `help.pgease.in/kyc_verification`
  - `help.pgease.in/staff_management`
  - `help.pgease.in/expense_tracker`
  - `help.pgease.in/complaints_resolution`
  - `help.pgease.in/public_listing`
- **Dynamic & Resilient API Integration**: Fetches real-time tutorial configurations from `GET /tutorials` and `GET /tutorials/:key` with instant offline fallback.
- **PG Ease Brand Design**: Full PG Ease teal design language (`#008080`), official logo, responsive search filter, and support helpline.

## Development
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build production bundle
npm run build
```

## Deployment
Configured with `_redirects` and `vercel.json` for SPA single-page routing on Vercel or Cloudflare Pages.
