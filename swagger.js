// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library API',
    description: 'CRUD API for Books and Authors (Week 03)',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  basePath: '/',
  tags: [
    { name: 'Books', description: 'Books CRUD' },
    { name: 'Authors', description: 'Authors CRUD' }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON generated with host:', doc.host);
});
