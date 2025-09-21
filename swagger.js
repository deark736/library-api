const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { title: 'Library API', description: 'CRUD API for Books and Authors (Week 03)', version: '1.0.0' },
  host: 'library-api-9ez6.onrender.com',
  schemes: ['https'],
  basePath: '/',
  tags: [
    { name: 'Books', description: 'Books CRUD' },
    { name: 'Authors', description: 'Authors CRUD' }
  ]
};

const outputFile = './swagger.json';
// IMPORTANT: include server.js first so autogen sees the mount points
const endpointsFiles = [
  './server.js',
  './routes/authors.routes.js',
  './routes/books.routes.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON generated with host:', doc.host);
});
