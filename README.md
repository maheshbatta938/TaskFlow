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

Create a `.env` file with your MySQL and JWT configuration.

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
