# Aruvi Tours

A full-stack travel and tour package management web application built with a React frontend and Node.js/Express REST API backend connected to MongoDB.

---

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router DOM v6, Framer Motion, GSAP, Lenis Smooth Scroll, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcryptjs, CORS, dotenv
- **Orchestration**: Concurrently (runs frontend & backend in parallel for development)

---

## Project Structure

```text
aruvi-tours/
├── backend/                  # Node.js Express REST API server
│   ├── config/              # Database connection & seed runner
│   ├── controllers/         # Request handling & business logic
│   ├── middleware/          # Authentication & verification middleware
│   ├── models/              # Mongoose data schemas (Package, Booking, Contact, etc.)
│   ├── routes/              # Express API endpoints
│   ├── utils/               # Package data seeding utility
│   ├── .env.example         # Example backend environment variables
│   ├── package.json         # Backend dependencies & scripts
│   └── server.js            # Express application entrypoint
├── frontend/                 # React SPA frontend (Vite)
│   ├── public/              # Static assets, destination imagery, robots, sitemaps
│   ├── src/                 # React source code (components, pages, services, data)
│   ├── .env.example         # Example frontend environment variables
│   ├── package.json         # Frontend dependencies & scripts
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # Tailwind CSS configuration
├── .gitignore                # Root Git ignore rules
├── package.json              # Monorepo/root orchestration scripts
├── package-lock.json         # Root lock file
├── README.md                 # Project documentation
└── render.yaml               # Deployment blueprint configuration
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local MongoDB instance or MongoDB Atlas cluster URI)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

---

## Installation & Setup

### 1. Clone & Open Project
Navigate to the root directory of the project:
```bash
cd aruvi-tours
```

### 2. Configure Environment Variables

#### Backend
In the `backend/` directory, create a `.env` file from `.env.example`:
```bash
cp backend/.env.example backend/.env
```
Update `backend/.env` with your values:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

#### Frontend (Optional)
In the `frontend/` directory, create a `.env` file if you wish to override the default backend API URL:
```bash
cp frontend/.env.example frontend/.env
```
Default configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install All Dependencies
Install dependencies for root, backend, and frontend with a single command from the root directory:
```bash
npm run install-all
```
*(Alternatively, you can run `npm install` inside the root, `backend/`, and `frontend/` directories individually).*

---

## Running the Application

### Option 1: Run Both Frontend and Backend Concurrently (Recommended)
From the root directory:
```bash
npm run dev
```
- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:5173

### Option 2: Run Separately
In two separate terminal windows:

- **Terminal 1 (Backend)**:
  ```bash
  cd backend
  npm run dev
  ```
  *(Starts the Express server with nodemon at `http://localhost:5000`)*

- **Terminal 2 (Frontend)**:
  ```bash
  cd frontend
  npm run dev
  ```
  *(Starts the Vite dev server at `http://localhost:5173`)*

---

## Building for Production

To create an optimized production build of the frontend:
```bash
cd frontend
npm run build
```
The output will be generated in `frontend/dist/`.

To run the backend in production mode:
```bash
cd backend
npm start
```

---

## Features

- **Dynamic Tour Catalog**: Browse domestic and international travel packages with detailed itineraries and pricing.
- **Booking & Inquiries**: Interactive booking and contact submission forms connected to MongoDB.
- **Admin Management & Authentication**: Secure JWT-based admin authentication and dashboard for managing packages and submissions.
- **Automatic Seeding**: On first run with an empty database, initial package and administrator records are seeded automatically.
- **Modern Responsive UI**: Built with Tailwind CSS, custom animations, and smooth scrolling for desktop and mobile devices.
