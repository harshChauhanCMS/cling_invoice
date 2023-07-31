// /* eslint-disable no-console */
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Vahansetu API Documentation',
//       version: '1.0.0',
//       description: 'Documentation for my API',
//     },
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearFormat: 'JWT',
//         },
//       },
//     },
//     security: [{ bearerAuth: [] }],
//   },
//   apis: ['./routes/*.js', './index.js', './controllers/*.js'],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// function swagger(app, port) {
//   app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   app.get('/doc.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
//   });
//   console.log(`Swagger docs available at http://localhost:${port}/doc`);
// }

// module.exports = swagger;
