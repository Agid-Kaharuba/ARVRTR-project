import { Server } from 'http';
import bodyParser from 'body-parser';
import config from './helpers/config';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import ApiInitializer from './initializer';
import { Routes } from './routes';

const mongoUri = `${config.DATABASE_URL}/${config.DATABASE_NAME}` as string;
// @ts-ignore
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    throw err;
  } else {
    // eslint-disable-next-line no-console
    console.log(`Successfully connected to ${config.DATABASE_NAME}`);
  }
});

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Swagger Docs
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'XRT Training',
      version: '1.0.0',
    },
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['src/app.ts', 'src/routes/*']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
if (process.env.STAGE !== 'prod') {
	fs.writeFileSync('../docs/swagger/swagger.json', JSON.stringify(swaggerDocs));
}
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Routes
const apiInit = new ApiInitializer(app);
Routes(apiInit);

// Default route
/**
 * @swagger
 * /:
 *  get:
 *   description: Default route
 *   responses:
 *    200:
 *     description: Success
 */
app.get('/', (req, res) => {
  res.json({
    stage: config.STAGE,
    msg: 'Hello world from XRT Training API 🚀🚀🚀🚀!',
  });
});

// Startup complete
const server: Server = app.listen(config.API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is now running at:  http://localhost:${config.API_PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger Docs:              http://localhost:${config.API_PORT}/swagger`);
});

module.exports = server;
