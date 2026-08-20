# Task Management System

A full-stack task management application where users can create, manage, search, filter, and track their tasks with a simple analytics dashboard.

## 🚀 Live Demo

**https://task-flow-9byi.vercel.app/**

## ✨ Features

* 🔐 User signup and login
* 🔑 JWT authentication
* 🔒 Protected routes
* 📝 Create, update, delete and complete tasks
* 🔎 Search and filter tasks
* 📄 Pagination and sorting
* 📊 Task analytics dashboard
* 🎯 Status and priority tracking
* 📱 Responsive UI
* 🌙 Dark mode
* 🔔 Toast notifications

## 🛠️ Tech Stack

**Frontend**

* Angular 16
* TypeScript
* Angular Reactive Forms
* Angular Router

**Backend**

* Node.js
* Express.js
* Sequelize ORM
* JWT
* bcrypt
* express-validator

**Database**

* MySQL 8

## 📁 Project Structure

```text
task-management-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── ...
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── core/
│   │       ├── shared/
│   │       ├── layout/
│   │       └── features/
│   └── package.json
│
└── README.md
```

## ⚙️ Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `backend/.env` file:

```env
PORT=
NODE_ENV=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
JWT_EXPIRES_IN=

CLIENT_URL=
```

Create the `taskmanager` database in MySQL beforehand — Sequelize syncs the `users` and `tasks` tables on startup.

### Frontend

```bash
cd frontend
npm install
ng serve
```

The frontend runs on:

```text
http://localhost:4200
```

The backend runs on:

```text
http://localhost:5000
```

The frontend's API base URL is set in `frontend/src/environments/environment.ts` (dev) and `environment.prod.ts` (production build) — point `apiUrl` at whichever backend you're running against.

## 📡 API Endpoints

All routes are prefixed with `/api`. Task routes require an `Authorization: Bearer <token>` header (token returned by signup/login).

### Auth — `/api/auth`

| Method | Endpoint    | Auth | Body                          | Description             |
| ------ | ----------- | ---- | ------------------------------ | ------------------------ |
| POST   | `/signup`   | No   | `name, email, password`        | Create an account, returns `{ user, token }` |
| POST   | `/login`    | No   | `email, password`               | Log in, returns `{ user, token }` |
| POST   | `/logout`   | Yes  | –                               | Stateless logout (client discards the token) |

### Tasks — `/api/tasks`

| Method | Endpoint          | Body / Query                                                                 | Description                  |
| ------ | ------------------ | ----------------------------------------------------------------------------- | ----------------------------- |
| GET    | `/`                | query: `status, priority, search, page, limit, sortBy, sortOrder`             | List the caller's tasks, paginated/filtered/sorted |
| GET    | `/analytics`       | –                                                                              | Task counts by status/priority for the dashboard |
| GET    | `/:id`             | –                                                                              | Get a single task |
| POST   | `/`                | `title, description?, status?, priority?, dueDate?`                           | Create a task |
| PUT    | `/:id`             | `title?, description?, status?, priority?, dueDate?`                          | Update a task |
| PATCH  | `/:id/status`      | `status`                                                                       | Update just the status |
| DELETE | `/:id`             | –                                                                              | Delete a task |

`status`: `TODO` \| `IN_PROGRESS` \| `DONE`  ·  `priority`: `LOW` \| `MEDIUM` \| `HIGH`

Every response is wrapped as `{ success, message, data }` (or `{ success, message, errors }` on failure).

## 🧠 Design Decisions

* **Layered backend (routes → controllers → services → models)** — controllers stay thin (parse request, call a service, shape the response); business logic and Sequelize queries live in services, so they're testable independent of Express.
* **Task ownership enforced at the service layer** — every task query is scoped by `userId`, so one user can never read or mutate another user's tasks, even by guessing an id.
* **Composite DB indexes on `(user_id, status)`, `(user_id, priority)`, `(user_id, due_date)`** — every list/filter/search query already filters by the owning user, so these keep those lookups off a full table scan as data grows.
* **express-validator at the route layer** — invalid input is rejected before it reaches a controller, keeping validation rules declarative and colocated with the routes they guard.
* **JWT auth, no server-side sessions** — the API stays stateless and horizontally scalable; `/auth/logout` exists only so the client has a symmetric, protected call to make, since sign-out is really just discarding the token.
* **Angular environment files for API base URL** — `environment.ts` vs `environment.prod.ts` are swapped by Angular's `fileReplacements` at build time, so dev (`ng serve`) and the deployed Vercel build never need code changes to point at different backends (local vs Render).
* **Mobile layout collapses the sidebar into a bottom tab bar** rather than a hamburger drawer, since the app only has two-three primary destinations — a fixed bottom bar keeps navigation one tap away without an extra open/close interaction.

## 🏗️ Architecture

```text
Angular
   ↓
Express REST API
   ↓
Controllers
   ↓
Services
   ↓
Sequelize
   ↓
MySQL
```

## 🔒 Security

* JWT-based authentication
* bcrypt password hashing
* Protected API routes
* User-specific task access
* Server-side validation
* Environment variables for sensitive configuration

## 🔮 Future Improvements

* Refresh tokens
* Role-based access control
* Real-time updates
* Caching
* Background jobs
* Automated tests

## 👨‍💻 Author

**Mahesh Batta**

Built with Angular, Node.js, Express, Sequelize, and MySQL.
