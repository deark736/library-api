const router = require('express').Router();
const ctrl = require('../controllers/authors.controller');

/* #swagger.tags = ['Authors'] */

/* #swagger.path = '/authors' */
/* #swagger.method = 'get' */
router.get('/', ctrl.getAll);

/* #swagger.path = '/authors/{id}' */
/* #swagger.method = 'get'
   #swagger.parameters['id'] = { in: 'path', required: true } */
router.get('/:id', ctrl.getById);

router.post('/', (req, res) => {
  /* #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
          firstName: "Robert",
          lastName: "Martin",
          email: "unclebob@example.com",
          birthdate: "1952-12-05",
          country: "USA"
        }
  } */
  return ctrl.create(req, res);
});

router.put('/:id', (req, res) => {
  /* #swagger.parameters['id'] = { in: 'path', required: true }
     #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
          firstName: "Robert",
          lastName: "Martin",
          email: "unclebob@example.com",
          birthdate: "1952-12-05",
          country: "USA"
        }
  } */
  return ctrl.update(req, res);
});

/* #swagger.path = '/authors/{id}' */
/* #swagger.method = 'delete'
   #swagger.parameters['id'] = { in: 'path', required: true } */
router.delete('/:id', ctrl.remove);

module.exports = router;
