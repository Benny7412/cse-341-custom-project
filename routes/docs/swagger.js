const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cats API',
    description: 'API for managing cats and cat breeds information'
  },
  host: 'cse-341-custom-project.onrender.com',
  basePath: '/',
  schemes: ['https'],
};

const outputFile = 'routes/docs/swagger.json';
const endpointsFiles = [
    '../index.js',
    '../cats.js',
    '../catBreeds.js'
];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);