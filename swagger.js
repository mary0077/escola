const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Alunos',
      version: '1.0.0',
      description: 'API para gerenciar alunos de uma escola'
    },
    servers: [
      {
        url: `/`
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      requestInterceptor: (req) => {  
        const token = sessionStorage.getItem('authToken'); // Pega o token do localStorage
        console.log(token);
        if (token) {
          req.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho Authorization
        }
        return req;
      }
    }
  }));
};

module.exports = setupSwagger;
