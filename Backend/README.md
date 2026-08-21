# SkillBarter — Backend

Express + Prisma + PostgreSQL + Socket.IO API for the SkillBarter peer-to-peer
skill exchange platform.

This implements the full MVP feature set from the spec: auth, skill profiles,
skill search, the reciprocal matching engine, exchange requests, real-time
chat, session scheduling + code verification, reviews/reputation, and
report/block safety — all enforced server-side.

## 1. Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a connection string to a hosted instance)
- npm

## 2. Install

```bash
cd backend
npm install
```

## 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/skillbarter"
JWT_SECRET="change_this_to_a_long_random_secret"
JWT_EXPIRES_IN="7d"
PORT=5000
CLIENT_URL="http://localhost:5173"
VERIFICATION_CODE_TTL_MINUTES=30
```

Never commit `.env`.

## 4. Create the database

```bash
createdb skillbarter
# or, from psql: CREATE DATABASE skillbarter;
```

## 5. Run the migration and generate the client

```bash
npx prisma migrate dev --name init
npx prisma generate
```

`prisma migrate dev` creates every table from `prisma/schema.prisma`
(User, Profile, Skill, UserSkill, Availability, ExchangeRequest,
Conversation, Message, Session, SessionVerification, Review, Report,
Block, Notification) and applies it to your database.

## 6. Seed demo data (recommended before any demo)

```bash
npm run seed
```

This creates 5 demo users (Aarav, Sita, Rohan, Maya, Nisha) with skills,
availability, a pending exchange request, and one fully completed +
reviewed exchange between Aarav and Sita — so the dashboard has real
matches, a pending request, and a 5-star reputation the moment you log in.

All demo accounts use the password: `password123`
(e.g. `aarav@demo.university.edu` / `password123`)

## 7. Run the server

```bash
npm run dev     # nodemon, auto-restarts on file changes
# or
npm start
```

You should see:

```text
Server running on port 5000
```

Visit `http://localhost:5000/` — you should get:

```json
{ "message": "SkillBarter API is running" }
```

## 8. Inspect the database visually (optional)

```bash
npx prisma studio
```

---

## API overview

All routes are prefixed with `/api`. Every route except register/login
requires `Authorization: Bearer <token>`.

| Area | Routes |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` |
| Profile | `GET /profile/me`, `PUT /profile/me`, `GET /profile/:userId` |
| Skills | `GET /skills?search=`, `GET /skills/:skillId/users`, `GET /skills/me`, `POST /skills/me`, `DELETE /skills/me/:id` |
| Availability | `GET /availability/me`, `PUT /availability` |
| Matching | `GET /matches` |
| Exchanges | `POST /exchanges`, `GET /exchanges`, `GET /exchanges/:id`, `PATCH /exchanges/:id/accept`, `PATCH /exchanges/:id/decline`, `PATCH /exchanges/:id/cancel` |
| Chat | `GET /exchanges/:id/messages` (history) + Socket.IO for real-time |
| Sessions | `POST /sessions`, `GET /sessions`, `GET /sessions/:id`, `PATCH /sessions/:id/start`, `POST /sessions/:id/verify`, `PATCH /sessions/:id/complete`, `PATCH /sessions/:id/cancel` |
| Reviews | `POST /reviews`, `GET /reviews/user/:userId` |
| Reports | `POST /reports` |
| Blocks | `POST /blocks`, `DELETE /blocks/:blockedUserId`, `GET /blocks` |
| Notifications | `GET /notifications`, `PATCH /notifications/:id/read`, `PATCH /notifications/read-all` |

### Socket.IO chat

Connect with the JWT in the handshake:

```js
const socket = io("http://localhost:5000", { auth: { token: jwtToken } });

socket.emit("join_exchange", exchangeId);
socket.emit("send_message", { exchangeId, content: "Are you free Saturday?" });
socket.on("receive_message", (message) => { /* append to chat */ });
socket.on("chat_error", (err) => { /* e.g. blocked, not a member */ });
```

Every socket event re-checks exchange membership and blocks server-side —
the same as the REST layer — so the frontend can never bypass safety rules.

---

## How the matching engine works

`src/services/matchingService.js` implements spec section 30–32:

1. Find every user who **teaches** a skill the current user wants to **learn**.
2. For each candidate, check if they also **want to learn** something the
   current user teaches → `RECIPROCAL` match. Otherwise → `COMPATIBLE` match.
3. Score out of 100 using the weighted formula from the spec:
   Skill compatibility 40 / Availability 25 / Skill level 15 / Format 10 / Campus 10.

This is explicitly a deterministic heuristic — the API and UI should always
label it "Compatibility Score," never "AI match."

## Session verification flow

1. `PATCH /sessions/:id/start` → generates a 6-digit code, session → `STARTED`.
2. Each participant calls `POST /sessions/:id/verify` with the code shown by
   the other person in real life. Code expires after
   `VERIFICATION_CODE_TTL_MINUTES`.
3. Once both `teacherVerified` and `learnerVerified` are true, either
   participant calls `PATCH /sessions/:id/complete` → session → `COMPLETED`,
   `completedSessions` and `reliabilityScore` are recalculated on both
   profiles, and both users get a "leave a review" notification.

## Safety enforcement

Blocks and reports are enforced **server-side**, not just hidden in the UI
(spec section 38/46):

- `matchingService` excludes blocked users from candidates.
- `exchangeController` refuses requests between blocked users.
- `chatController` and the socket handler both re-check block status before
  returning messages or allowing a `send_message`.
- `profileController` returns 403 when viewing a blocked user's profile.

## Project structure

```text
backend/
├── src/
│   ├── controllers/     # one file per resource
│   ├── routes/          # one file per resource, combined in routes/index.js
│   ├── middleware/       # authMiddleware, errorHandler
│   ├── services/         # matchingService, blockService, notificationService
│   ├── sockets/          # Socket.IO chat handler
│   ├── utils/            # asyncHandler, generateToken, generateCode, apiResponse
│   ├── validators/        # lightweight manual validation helpers
│   ├── config/prisma.js  # shared PrismaClient instance
│   └── server.js         # app entry point
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── .env.example
└── package.json
```

## Troubleshooting

- **"Environment variable not found: DATABASE_URL"** — you haven't copied
  `.env.example` to `.env`, or your database isn't running.
- **`prisma generate` fails to download a binary** — you're offline or a
  firewall is blocking `binaries.prisma.sh`; retry once you have normal
  internet access, this only needs to succeed once.
- **CORS errors from the frontend** — make sure `CLIENT_URL` in `.env`
  exactly matches the URL your React dev server runs on (e.g.
  `http://localhost:5173`, no trailing slash).
