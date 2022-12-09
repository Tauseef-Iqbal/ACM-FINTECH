const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'ACM-FINTECH',
    description: 'ACM-FINTECH',
    contact: {
      name: 'Tauseef Iqbal',
      email: 'tauseefiqbal939@gmail.com',
      url: '',
    },
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJSDoc(options);
