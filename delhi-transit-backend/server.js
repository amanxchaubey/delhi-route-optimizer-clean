const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDatabase = require('./config/database');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const oauthRoutes = require('./routes/oauth');
const routeRoutes = require('./routes/routes');
const transitRoutes = require('./routes/transit');
const { errorHandler } = require('./middleware/errorHandler');
const stationRoutes = require('./routes/stations');
const newsletterRoutes = require('./routes/newsletter');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust first proxy (Render/Vercel)
app.set('trust proxy', 1);

// Debug middleware to see all requests
app.use((req, res, next) => {
  console.log(`📍 ${req.method} ${req.path}`);
  next();
});

// CORS configuration - IMPORTANT for OAuth
// CORS configuration - IMPORTANT for OAuth
const allowedOrigins = [
  'https://delhi-route-optimizer-clean.vercel.app',
  'https://delhi-route-optimizer-clean-aman-chaubeys-projects.vercel.app', // Alternative Vercel URL
  process.env.CLIENT_URL
].filter(Boolean).map(o => o.replace(/\/$/, '')); // Normalize: remove trailing slashes

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const normalizedOrigin = origin.replace(/\/$/, '');
    console.log(`📍 [CORS] Incoming Origin: ${origin}`);
    
    if (allowedOrigins.indexOf(normalizedOrigin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      console.log(`❌ [CORS] Origin not allowed: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization']
}));

// Helmet - configure to allow OAuth redirects
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://apis.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://use.fontawesome.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://use.fontawesome.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: [
        "'self'",
        "https://delhi-route-optimizer-clean.vercel.app",
        "https://delhi-route-optimizer-clean.onrender.com",
        process.env.CLIENT_URL,
        process.env.SERVER_URL
      ].filter(Boolean),
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport
app.use(passport.initialize());

// Test route to check if server is running
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Routes - OAuth routes first
app.use('/api/oauth', oauthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/transit', transitRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Delhi Transit API is running!',
    endpoints: {
      oauth: '/api/oauth/google',
      auth: '/api/auth',
      routes: '/api/routes'
    }
  });
});

// Error handling
app.use(errorHandler);

// Database connection and server start
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔑 OAuth endpoints:`);
      console.log(`   - Google: http://localhost:${PORT}/api/oauth/google`);
      console.log(`   - GitHub: http://localhost:${PORT}/api/oauth/github`);
      console.log(`   - Microsoft: http://localhost:${PORT}/api/oauth/microsoft`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();