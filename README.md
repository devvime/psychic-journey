# 🌀 Psychic Journey

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE)

> A Node.js application with a modular architecture using custom routing, dependency injection, and Knex for database management.

---

## 🚀 Installation

```bash
./install.sh
````

> The script will automatically:
>
> * Copy `.env.example` → `.env` (if it doesn’t exist)
> * Install Node.js dependencies
> * Prepare your local environment

---

## ⚙️ Environment Configuration

Edit the `.env` file with your database credentials and environment settings.

---

## 🧩 Database Migrations & Seeds

### Create a new migration

```bash
npm run migrate:make migrationName
```

### Run migrations

```bash
npm run migrate:dev       # Development
npm run migrate:stg       # Staging
npm run migrate:prod      # Production
```

### Rollback migrations

```bash
npm run migrate:dev:rollback
npm run migrate:stg:rollback
npm run migrate:prod:rollback
```

### Create a new seed

```bash
npm run seed:make seedName
```

### Run seeds

```bash
npm run seed:dev:run
```

---

## 🐳 Run with Docker

```bash
docker compose up --build -d
```

> Runs the entire application stack using Docker and Docker Compose.

---

## 🧠 Creating a Controller

Example of a simple controller using custom decorators:

```js
import container from "#root/container.js";
import { Get, Post } from "#core/router.js"; // Supports: Get, Post, Put, Patch, Delete

class UserController {
  constructor() {
    Get('/user', this.list);
    Post('/user', this.create);
  }

  list(req, res) {
    const result = container.UserService.list();
    res.json(result);
  }

  create(req, res) {
    const result = container.UserService.create();
    res.json(result);
  }
}

export default new UserController();
```

---

## 🧱 Registering the Controller and Service

Add your controller and service inside `container.js`:

```js
import UserController from "#app/domains/user/user.controller.js";
import UserService from "#app/domains/user/user.service.js";

export default {
  UserController,
  UserService
};
```

> ⚠️ All imported classes in `container.js` **must be exported as instantiated objects** (using `new`).

---

## 🧭 Project Structure

```
src/
├── app/
│   └── domains/
│       └── user/
│           ├── user.controller.js
│           └── user.service.js
├── core/
├── database/
│   ├── migrations/
│   └── seeds/
├── middleware/
├── container.js
└── main.js
```

---

## 💡 Notes & Conventions

* Follow the naming convention:
  `domainName.controller.js` | `domainName.service.js`
* Each controller automatically registers its routes when instantiated.
* Keep business logic inside services, not controllers.
* Use environment-specific scripts (`migrate:dev`, `migrate:stg`, `migrate:prod`) for clean database management.

---

## 🧾 License

This project is licensed under the **MIT License**.
