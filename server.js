// server.js
require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { initDb } = require('./data/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Simple health route
app.get('/', (req, res) => {
  /* #swagger.ignore = true */
  res.json({ message: 'Library API is running', docs: '/api-docs' });
});

// Routes
app.use('/books', require('./routes/books.routes'));
app.use('/authors', require('./routes/authors.routes'));

// Swagger UI (published docs)
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
  .catch((err) => {
    console.error('DB init failed:', err);
    process.exit(1);
  });
