const dotenv = require('dotenv');
dotenv.config();

const scheme = process.env.SCHEME || 'http';
const host = process.env.BASE_URL || 'localhost:8080';

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cats API',
    description: 'API for managing cats and cat breeds information',
    host
  },
  host: 'cse-341-custom-project.onrender.com',
  basePath: '/',
  schemes: scheme,
};

const outputFile = 'routes/docs/swagger.json';
const endpointsFiles = ['../index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);