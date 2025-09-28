// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { title: 'Library API', description: 'CRUD API for Books and Authors (Week 03)', version: '1.0.0' },
  host: 'library-api-9ez6.onrender.com', // use 'localhost:3000' while local
  schemes: ['https'],                    // use ['http'] locally
  basePath: '/',
  tags: [
    { name: 'Books', description: 'Books CRUD' },
    { name: 'Authors', description: 'Authors CRUD' },
  ],
  // (Optional) Make JSON explicit for Swagger 2.0:
  // consumes: ['application/json'],
  // produces: ['application/json'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // keep root so we don’t get stray / and /{id}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON generated with host:', doc.host);
});
