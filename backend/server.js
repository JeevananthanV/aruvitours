const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const { handleSSEConnection } = require('./utils/realtimeHub');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to Database
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Enable CORS
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow dev environments
    }
  },
  credentials: true
}));

// Real-Time Server-Sent Events (SSE) Stream
app.get('/api/realtime', handleSSEConnection);

// Simple Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    service: 'Aruvi Tours Enterprise API',
    version: '2.0.0',
    timestamp: new Date()
  });
});

// Import route files
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const departureRoutes = require('./routes/departureRoutes');
const authRoutes = require('./routes/authRoutes');
const operationRoutes = require('./routes/operationRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Mount routes
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/departures', departureRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`\n============================================================`);
  console.log(`🚀 Aruvi Tours Backend Server running on port ${PORT}`);
  console.log(`   Health Check: GET http://localhost:${PORT}/api/health`);
  console.log(`   SSE Stream  : GET http://localhost:${PORT}/api/realtime`);
  console.log(`   Operations  : GET http://localhost:${PORT}/api/operations`);
  console.log(`   Admin Stats : GET http://localhost:${PORT}/api/admin/stats`);
  console.log(`============================================================\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection Error: ${err.message}`);
});
