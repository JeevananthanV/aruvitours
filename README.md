# 🌿 Aruvi Tours — Luxury Travel Suite & Tour Operations Platform

[![GitHub Repository](https://img.shields.io/badge/GitHub-JeevananthanV%2Faruvitours-gold?style=for-the-badge&logo=github)](https://github.com/JeevananthanV/aruvitours)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Frontend: React 19 + Vite](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite-61dafb?style=for-the-badge&logo=react)](https://vitejs.dev/)
[![Backend: Express + MongoDB](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20MongoDB-47a248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Real-time: SSE](https://img.shields.io/badge/Realtime-Server--Sent%20Events-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

> A bespoke, full-stack luxury travel application and real-time tour operations management console built with a high-performance React frontend and a robust Node.js/Express REST API connected to MongoDB.

---

## 🌟 Key Highlights & Real-Time Capabilities

### 1. 🚌 Real-Time Tour Operations & Fleet Dispatch
- **Live Fleet Tracking & Dispatch**: Manage vehicles (`Volvo 9600 Multi-Axle`, `Force Urbania`, `Innova Crysta`), chauffeur assignments, tour codes (`AT-OP-101`), and active itineraries.
- **Trip Status Transitions**: Track tours across life-cycles (`SCHEDULED` ➔ `BOARDING_ACTIVE` ➔ `EN_ROUTE` ➔ `SITE_VISIT` ➔ `RETURN_JOURNEY` ➔ `COMPLETED` / `DELAYED`).
- **GPS Landmark Milestones**: Post live operational checkpoints and route activity logs (e.g., *"Breakfast stop completed at Krishnagiri. Proceeding to Nilgiri Ghats"*).
- **Server-Sent Events (SSE) Stream (`/api/realtime`)**: Broadcasts instant booking alerts, passenger boarding toggles, and fleet updates directly to active admin sessions without manual browser reloads.

### 2. 📋 Digital Passenger Manifest & Boarding Check-In
- **Manifest Table**: Displays traveler name, contact number, pickup point, assigned seat number, and boarding status.
- **1-Click Digital Check-In**: Seamlessly mark passengers as `BOARDED`, `PENDING`, or `NO_SHOW` with instant database persistence and SSE broadcast.

### 3. 📊 Luxury Admin Console
- **Executive KPI Dashboard**: Projected revenue calculations, booking volume, active trip counts, and real-time sync indicators.
- **Interactive SVG Analytics**: Visual monthly booking influx curve graphs and destination category distribution donut charts.
- **Booking Management**: Filter, search by booking reference (`AT-2027-XXXX`), update status (`Confirmed`, `Pending`, `Cancelled`), and assign bookings to operations.
- **Package Inventory Catalog**: Full CRUD for domestic, international, and HNI luxury tour packages.
- **Inquiry & Lead Management**: Guest inquiries tracking with workflow states (`New`, `In Progress`, `Resolved`) and one-click CSV data exports.

### 4. 🧳 Guest Reservation Experience
- **Interactive Itinerary Booking**: Seamless package selection, guest party count calculation, and preferred boarding hub selector.
- **Digital Reservation Receipt**: Auto-generated booking reference and estimated cost breakdown.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router v6, Framer Motion, GSAP Smooth Scroll, Axios, HTML5 Server-Sent Events.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcryptjs, CORS, dotenv.
- **Port Strategy**:
  - Frontend: `http://localhost:5173` *(Vite proxy forwarding `/api` to port 5001)*
  - Backend: `http://localhost:5001` *(Express + MongoDB)*

---

## 📂 Project Architecture

```text
aruvi-tours/
├── backend/                  # Node.js & Express REST API Server
│   ├── config/              # MongoDB connection configuration
│   ├── controllers/         # Business logic (Operations, Bookings, Packages, Admin, Contacts)
│   ├── middleware/          # JWT auth & error handling middleware
│   ├── models/              # Mongoose schemas (TourOperation, Booking, Package, Contact, Admin)
│   ├── routes/              # Express API route endpoints
│   ├── utils/               # Real-time SSE event hub & database seeder
│   ├── .env.example         # Example backend environment variables
│   ├── package.json         # Backend dependencies & scripts
│   └── server.js            # Main backend entrypoint (Port 5001)
├── frontend/                 # React SPA Frontend (Vite)
│   ├── public/              # High-res photography, icons, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/      # UI components (Layout, ScrollReveal, Navbar, Footer)
│   │   ├── pages/           # AdminDashboard, Booking, Contact, Destinations, Home
│   │   ├── services/        # API service clients & SSE subscription handler
│   │   └── data/            # Static luxury packages and catalog fallback
│   ├── vite.config.js       # Vite configuration with /api proxy to Port 5001
│   ├── package.json         # Frontend dependencies
│   └── tailwind.config.js   # Custom luxury color palette & typography
├── .gitignore                # Root Git ignore rules
├── package.json              # Monorepo orchestration scripts
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) running locally on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

### 2. Backend Setup
```bash
cd aruvi-tours/backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start backend server
node server.js
```
*Backend runs on `http://localhost:5001`.*

### 3. Frontend Setup
```bash
cd aruvi-tours/frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 🔑 Default Admin Credentials

- **Admin Portal**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **Username**: `admin`
- **Password**: `admin123`

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status | Public |
| `GET` | `/api/realtime` | Server-Sent Events (SSE) live push stream | Public / Admin |
| `GET` | `/api/operations` | List all tour operations (filterable by status) | Admin |
| `POST` | `/api/operations` | Dispatch a new tour operation | Admin |
| `PUT` | `/api/operations/:id` | Update operation details or status | Admin |
| `POST` | `/api/operations/:id/milestone` | Broadcast a live GPS milestone & note | Admin |
| `PUT` | `/api/operations/:id/passenger-checkin` | Check-in passenger (`BOARDED`/`NO_SHOW`) | Admin |
| `GET` | `/api/bookings` | List all guest bookings & filter | Admin |
| `POST` | `/api/bookings` | Submit new booking request | Public |
| `PUT` | `/api/bookings/:id/status`| Update reservation status | Admin |
| `GET` | `/api/admin/stats` | Dashboard KPI metrics & statistics | Admin |
| `GET` | `/api/admin/export/:type` | CSV export for bookings, operations, contacts | Admin |

---

## 👤 Author & Repository

- **Repository**: [https://github.com/JeevananthanV/aruvitours](https://github.com/JeevananthanV/aruvitours)
- **Author**: Jeevananthan V ([@JeevananthanV](https://github.com/JeevananthanV))
