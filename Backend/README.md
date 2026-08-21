# SkillBarter Backend

Express and MongoDB API for the SkillBarter frontend.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` and a strong `JWT_SECRET`.
3. Run `npm install`.
4. Start development mode with `npm run dev`.

The API runs at `http://localhost:5000` by default. Health check: `GET /api/health`.

For Google sign-up, create a Google OAuth web client, set its ID as
`GOOGLE_CLIENT_ID` in `Backend/.env` and `VITE_GOOGLE_CLIENT_ID` in
`Frontend/.env`, and allow `http://localhost:5173` as an authorized JavaScript origin.
