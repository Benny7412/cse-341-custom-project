const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cats API',
    description: 'API for managing cats and cat breeds information'
  },
  host: 'localhost:8080',
  basePath: '/',
  schemes: ['http'],
  tags: [
    {
      name: 'Cats',
      description: 'Endpoints for managing individual cats'
    },
    {
      name: 'Cat Breeds',
      description: 'Endpoints for managing cat breeds'
    }
  ],
  definitions: {
    Cat: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        breed: { type: 'string' }
      }
    },
    CatBreed: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        origin: { type: 'string' }
      }
    }
  }
};

const outputFile = 'routes/docs/swagger.json';
const endpointsFiles = [
    '../index.js',
    '../cats.js',
    '../catBreeds.js'
];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);