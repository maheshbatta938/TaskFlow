# Task Management — Frontend

Angular 16 (NgModules, lazy-loaded feature modules) client for the Task Management System.

See the root [README.md](../README.md) for the full project overview, and [docs/](../docs/) for detailed documentation:

- [docs/SETUP.md](../docs/SETUP.md) — install & run instructions
- [docs/FRONTEND.md](../docs/FRONTEND.md) — folder structure, routing, guards, interceptors

## Quick start

```bash
npm install
npx ng serve --port 4200
```

The API base URL is configured in `src/environments/environment.ts` (defaults to `http://localhost:5000/api`) — make sure the backend is running first.

## Build

```bash
npx ng build --configuration production
```

Output goes to `dist/frontend`.
