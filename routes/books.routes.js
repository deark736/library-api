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

/* #swagger.path = '/books' */
/* #swagger.method = 'post'
   #swagger.parameters['obj'] = { in: 'body', required: true } */
router.post('/', ctrl.create);

/* #swagger.path = '/books/{id}' */
/* #swagger.method = 'put'
   #swagger.parameters['id'] = { in: 'path', required: true }
   #swagger.parameters['obj'] = { in: 'body', required: true } */
router.put('/:id', ctrl.update);

/* #swagger.path = '/books/{id}' */
/* #swagger.method = 'delete'
   #swagger.parameters['id'] = { in: 'path', required: true } */
router.delete('/:id', ctrl.remove);

module.exports = router;
