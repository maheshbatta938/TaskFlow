# Task Management — Backend

Node.js + Express + MySQL (Sequelize) REST API with JWT authentication.

See the root [README.md](../README.md) for the full project overview, and [docs/](../docs/) for detailed documentation:

- [docs/SETUP.md](../docs/SETUP.md) — install & run instructions
- [docs/API.md](../docs/API.md) — every endpoint
- [docs/BACKEND.md](../docs/BACKEND.md) — architecture & request lifecycle
- [docs/DATABASE.md](../docs/DATABASE.md) — schema

## Quick start

```bash
npm install
cp .env.example .env   # then fill in real values
npm run dev
```

Health check: `GET http://localhost:5000/health`
