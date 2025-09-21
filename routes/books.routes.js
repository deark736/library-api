// routes/books.routes.js
const router = require('express').Router();
const ctrl = require('../controllers/books.controller');

/* #swagger.tags = ['Books'] */

/* #swagger.path = '/books' */
/* #swagger.method = 'get' */
router.get('/', ctrl.getAll);

/* #swagger.path = '/books/{id}' */
/* #swagger.method = 'get'
   #swagger.parameters['id'] = { in: 'path', required: true } */
router.get('/:id', ctrl.getById);

router.post('/', (req, res) => {
  /* #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
          title: "Clean Code",
          authorId: "68d0177c50413afc5359590e",
          isbn: "9780132350884",
          genre: "Software Engineering",
          publishedYear: 2008,
          pages: 464,
          inStock: true,
          price: 39.99
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
          title: "Clean Code",
          authorId: "68d0177c50413afc5359590e",
          isbn: "9780132350884",
          genre: "Software Engineering",
          publishedYear: 2008,
          pages: 464,
          inStock: true,
          price: 39.99
        }
  } */
  return ctrl.update(req, res);
});

/* #swagger.path = '/books/{id}' */
/* #swagger.method = 'delete'
   #swagger.parameters['id'] = { in: 'path', required: true } */
router.delete('/:id', ctrl.remove);

module.exports = router;
