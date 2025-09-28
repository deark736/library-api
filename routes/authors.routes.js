const router = require('express').Router();
const ctrl = require('../controllers/authors.controller');
const { ensureAuth } = require('../middleware/auth');

// GET /authors
router.get('/', (req, res) => {
  /*  #swagger.tags = ['Authors']
      #swagger.path = '/authors'
  */
  return ctrl.getAll(req, res);
});

// GET /authors/{id}
router.get('/:id', (req, res) => {
  /*  #swagger.tags = ['Authors']
      #swagger.path = '/authors/{id}'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  */
  return ctrl.getById(req, res);
});

// POST /authors (protected)
router.post('/', ensureAuth, (req, res) => {
  /*  #swagger.tags = ['Authors']
      #swagger.path = '/authors'
      #swagger.description = 'Requires login via /auth/github (browser will include session cookie).'
      #swagger.parameters['obj'] = {
        in: 'body', required: true, schema: {
          firstName: "Robert",
          lastName: "Martin",
          email: "unclebob@example.com",
          birthdate: "1952-12-05",
          country: "USA"
        }
      }
  */
  return ctrl.create(req, res);
});

// PUT /authors/{id} (protected)
router.put('/:id', ensureAuth, (req, res) => {
  /*  #swagger.tags = ['Authors']
      #swagger.path = '/authors/{id}'
      #swagger.description = 'Requires login via /auth/github (browser will include session cookie).'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.parameters['obj'] = {
        in: 'body', required: true, schema: {
          firstName: "Robert",
          lastName: "Martin",
          email: "unclebob@example.com",
          birthdate: "1952-12-05",
          country: "USA"
        }
      }
  */
  return ctrl.update(req, res);
});

// DELETE /authors/{id} (protected)
router.delete('/:id', ensureAuth, (req, res) => {
  /*  #swagger.tags = ['Authors']
      #swagger.path = '/authors/{id}'
      #swagger.description = 'Requires login via /auth/github (browser will include session cookie).'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  */
  return ctrl.remove(req, res);
});

module.exports = router;
