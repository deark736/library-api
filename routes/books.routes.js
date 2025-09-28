const router = require('express').Router();
const ctrl = require('../controllers/books.controller');
const { ensureAuth } = require('../middleware/auth');

// GET /books
router.get('/', (req, res) => {
  /*  #swagger.tags = ['Books']
      #swagger.path = '/books'
  */
  return ctrl.getAll(req, res);
});

// GET /books/{id}
router.get('/:id', (req, res) => {
  /*  #swagger.tags = ['Books']
      #swagger.path = '/books/{id}'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  */
  return ctrl.getById(req, res);
});

// POST /books (protected)
router.post('/', ensureAuth, (req, res) => {
  /*  #swagger.tags = ['Books']
      #swagger.path = '/books'
      #swagger.description = 'Requires login via /auth/github (browser will include session cookie).'
      #swagger.parameters['obj'] = {
        in: 'body', required: true, schema: {
          title: "Clean Code",
          authorId: "68d0177c50413afc5359590e",
          isbn: "9780132350884",
          genre: "Software Engineering",
          publishedYear: 2008,
          pages: 464,
          inStock: true,
          price: 39.99
        }
      }
  */
  return ctrl.create(req, res);
});

// PUT /books/{id} (protected)
router.put('/:id', ensureAuth, (req, res) => {
  /*  #swagger.tags = ['Books']
      #swagger.path = '/books/{id}'
      #swagger.description = 'Requires login via /auth/github (browser will include session cookie).'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.parameters['obj'] = {
        in: 'body', required: true, schema: {
          title: "Clean Code",
          authorId: "68d0177c50413afc5359590e",
          isbn: "9780132350884",
          genre: "Software Engineering",
          publishedYear: 2008,
          pages: 464,
          inStock: true,
          price: 39.99
        }
      }
  */
  return ctrl.update(req, res);
});

// DELETE /books/{id} (protected)
router.delete('/:id', ensureAuth, (req, res) => {
  /*  #swagger.tags = ['Books']
      #swagger.path = '/books/{id}'
      #swagger.description = 'Requires login via /auth/github (browser will include session cookie).'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  */
  return ctrl.remove(req, res);
});

module.exports = router;
