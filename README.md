# EG-Auth — Fullstack Authentication Web Application

This is a **monorepo fullstack web application** built with **NestJS (backend)** and **React (frontend)**, structured using **npm workspaces**. The application features secure cookie-based authentication and JWT support, designed for production deployment with Docker and GitHub Actions.

---

## Project Structure

```
EG-Auth/
├── apps/
│   ├── client/   # React + Vite frontend
│   └── server/   # NestJS backend
├── packages/     # Shared packages (optional)
├── Dockerfile    # Fullstack build (multi-stage)
├── .github/      # GitHub Actions workflows
├── package.json  # Root workspace manager
└── README.md
```

---

## Backend (NestJS)

Located in `apps/server`.

### Features

- **Modules**:

  - `AuthModule`
  - `UsersModule`
  - `AppModule` (root)

- **Authentication**:

  - Supports **JWT token** in **HttpOnly cookies**
  - Environment-based secret injection for security
  - AuthGuard-protected routes

- **Routes**:

  - `POST /auth/login` — Login
  - `POST /auth/signup` — Signup
  - `GET /auth/me` — Get authenticated user (protected)
  - `GET /` — Root route (protected)

- **User Schema (Mongoose)**:

  - `id`: ObjectId
  - `name`: String
  - `email`: String
  - `password`: Hashed password (stored securely)

- **API Documentation**:

  - Swagger available at: `GET /api/docs`

---

## Frontend (React + Vite)

Located in `apps/client`.

### Features

- **UI**:

  - Built with **Tailwind CSS** and **MUI (Joy UI)**

- **State Management**:

  - Auth store implemented using **Zustand**

- **API Layer**:

  - Centralized Axios interceptor and API methods in `src/api`
  - Automatic token validation via `/auth/me`

- **Pages**:

  - `Login` — User login with validation
  - `Signup` — User registration with:

    - Email validation
    - Password match check
    - Password strength requirements:

      - Minimum 8 characters
      - At least 1 letter, 1 digit, and 1 special character

  - `Home` — Protected dashboard, accessible only if authenticated

---

## Environment Variables

All sensitive configuration is provided via environment variables. In local development, they must be defined in a `.env` file at the root of the project (alongside `package.json`). These variables may also be injected via GitHub Secrets for CI/CD.

### Required Variables

| Variable              | Description                       |
| --------------------- | --------------------------------- |
| `COOKIE_NAME`         | Name of the authentication cookie |
| `BACKEND_PORT`        | Port on which the NestJS app runs |
| `JWT_SECRET`          | Secret key for JWT signing        |
| `DB_NAME`             | MongoDB database name             |
| `MONGODB_CONN_STRING` | Full MongoDB URI                  |
| `JWT_EXP_TIME`        | Expiration time (e.g., `1h`)      |
| `CORS_ORIGIN`         | Allowed origin for CORS           |
| `VITE_API_URL`        | API base URL for frontend         |

---

## Quick Start (Development)

```bash
# Install dependencies
npm install

# Run frontend and backend concurrently
npm run dev
```

This command starts:

- `apps/client` using Vite on port `5173`
- `apps/server` using NestJS on port `3000`

Ensure a valid `.env` file is present at the project root before running.

---

## Docker Build (Production)

The Dockerfile in the root builds both frontend and backend in a single image using multi-stage builds. All environment variables must be passed at build time.

```bash
docker build \
  --build-arg COOKIE_NAME=... \
  --build-arg BACKEND_PORT=... \
  --build-arg JWT_SECRET=... \
  --build-arg DB_NAME=... \
  --build-arg MONGODB_CONN_STRING=... \
  --build-arg JWT_EXP_TIME=... \
  --build-arg CORS_ORIGIN=... \
  --build-arg VITE_API_URL=... \
  -t eg-auth:latest .
```

---

## CI/CD (GitHub Actions)

GitHub Actions workflow is located in `.github/workflows/main.yml`.

### Current Behavior

- Trigger: Push to the `main` branch
- Builds Docker image using `Dockerfile`
- Injects secrets via GitHub Actions `secrets`
- No deployment or registry push yet

---
