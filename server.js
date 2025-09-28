// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { initDb } = require('./data/db');
const configurePassport = require('./auth/passport');
const passport = configurePassport();

const app = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// JSON parsing
app.use(express.json());

// Trust proxy for secure cookies on Render/Heroku-style proxies
app.set('trust proxy', 1);

// Sessions (cookie-based)
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd, // true in production so cookie only over HTTPS
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    },
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Simple health route
app.get('/', (req, res) => {
  /* #swagger.ignore = true */
  res.json({ message: 'Library API is running', docs: '/api-docs' });
});

// ---------- GitHub OAuth routes ----------
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/fail' }),
  (req, res) => {
    // After successful login, send users back to Swagger
    res.redirect('/api-docs');
  }
);

app.get('/auth/fail', (_req, res) => res.status(401).json({ message: 'GitHub login failed' }));

app.get('/auth/me', (req, res) => {
  // Check who is logged in
  if (req.isAuthenticated && req.isAuthenticated()) return res.json({ user: req.user });
  res.status(401).json({ message: 'Not authenticated' });
});

app.post('/auth/logout', (req, res, next) => {
  // Passport 0.6+ requires a callback
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.json({ message: 'Logged out' });
    });
  });
});
// ----------------------------------------

// Routes
app.use('/books', require('./routes/books.routes'));
app.use('/authors', require('./routes/authors.routes'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

// Global error fallback (optional)
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

initDb()
  .then(() => {
    app.listen(port, () => console.log(`Server on http://localhost:${port}`));
  })
  .catch(err => {
    console.error('DB init failed:', err);
    process.exit(1);
  });
