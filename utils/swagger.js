const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Vahansetu API Documentation',
      version: '1.0.0',
      description: 'Documentation for Vahansetu',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js', './index.js', './controllers/*.js'],
};

module.exports = swaggerOptions;
