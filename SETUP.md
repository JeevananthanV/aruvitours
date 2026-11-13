# Aruvi Tours — Complete Setup & Deployment Guide

Welcome to the **Aruvi Tours & Travels Operations Platform** setup guide. This document provides step-by-step instructions for local development, database seeding, real-time SSE stream configuration, and production deployment.

- **GitHub Repository**: [https://github.com/JeevananthanV/aruvitours](https://github.com/JeevananthanV/aruvitours)
- **Author**: Jeevananthan V

---

## 📋 System Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher (v20+ LTS recommended)
- **npm**: v9.0.0 or higher
- **Git**: v2.30.0 or higher

---

## 📥 1. Clone the Repository

```bash
git clone https://github.com/JeevananthanV/aruvitours.git
cd aruvitours
```

---

## ⚙️ 2. Environment Variables Configuration

### Backend Environment (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=aruvi_tour_super_secret_jwt_key_2026
ADMIN_USER=admin
ADMIN_PASS=aruvi2026
```

### Frontend Environment (`frontend/.env`)

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5001
```

---

## 📦 3. Install Dependencies

You can install dependencies for both services:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

---

## 🚀 4. Running the Application Locally

You need two terminal windows running concurrently:

### Terminal 1: Backend Server (Port 5001)

```bash
cd backend
npm start
# or for hot reload:
# node --watch server.js
```
The API server will be live at: `http://localhost:5001`
- Health Check: `http://localhost:5001/api/health`
- Real-time Operations Stream (SSE): `http://localhost:5001/api/ops/stream`

### Terminal 2: Frontend Client (Port 5173)

```bash
cd frontend
npm run dev
```
Open your browser at: `http://localhost:5173`

---

## 🔐 5. Default Credentials & Access Endpoints

| Portal / Feature | URL | Credentials |
|---|---|---|
| **Public Booking Portal** | `http://localhost:5173/` | Public Access |
| **Tour Operations Dashboard** | `http://localhost:5173/admin/operations` | Username: `admin` / Password: `aruvi2026` |
| **Passenger Manifest Check-In** | `http://localhost:5173/admin/manifest` | Operator Pin: `8844` |
| **Backend Health Endpoint** | `http://localhost:5001/api/health` | Public GET |

---

## 🏗️ 6. Production Build & Deployment

### Frontend Build
```bash
cd frontend
npm run build
```
The production bundle will be generated in `frontend/dist/`.

### Deployment Checklist
1. Deploy `backend` to Render, Railway, or AWS EC2 with environment variables configured.
2. Deploy `frontend/dist` to Vercel, Netlify, or Cloudflare Pages.
3. Update `VITE_API_URL` to point to the live backend URL and set `CLIENT_URL` on the backend to allow CORS.

---

## 🛠️ Troubleshooting

- **Port Conflict on 5001 or 5173**:
  Change `PORT` in `backend/.env` or run frontend with `npm run dev -- --port <port>`.
- **CORS Error**:
  Verify `CLIENT_URL` in `backend/.env` matches your exact frontend host (including protocol and port).
