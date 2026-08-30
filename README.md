# KisanQueue — SIH26032 Prototype

Smart Farmer Procurement Queue & Status Management System.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL.

## Demo logins

**Farmer** — phone `9999999999`, OTP `123456`
**Operator** — username `operator`, password `demo123`
**Admin** — username `admin`, password `demo123`

## Suggested demo flow

1. Open the landing page → "Book Procurement Slot" → Farmer Login (use demo credentials).
2. Farmer Dashboard shows token A-047, 18 farmers ahead, AI-predicted wait time.
3. Open "My Queue" → click **▶ Start Live Queue Simulation** — watch the queue advance in real time with notifications firing.
4. Log out, log in as Operator → see the same live queue → click a "Processing" row → Start Procurement → enter quantity → Complete Procurement.
5. Log back in as Farmer → Procurement Status shows "Completed" → Payment page shows "Processing" then "Completed" a few seconds later.
6. Log in as Admin → see charts, the AI congestion prediction card, and smart alerts update to reflect the day's load.

## Notes for judges

This is a hackathon prototype built on realistic mock data (no live Supabase project wired in), so it runs instantly with no setup. The AI prediction (`src/services/predictionEngine.js`) and notification logic (`src/services/notificationService.js`) are isolated modules, matching the spec's requirement that they be swappable for a real ML model / FCM integration later.
