import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from '@src/core/logger/loger-service';
import process from 'node:process';

const GLOBAL_PATH = 'api';

function setGlobalPipes(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      // Show error messages
      disableErrorMessages: false,
      // If user send extra data from the dto the data will be stripped
      whitelist: false,
      // To enable auto-transformation, set transform to true
      transform: true,
    }),
  );
}

function swaggerSetup(app) {
  const options = new DocumentBuilder()
    .setTitle('Starter service')
    .setDescription('Starter API description')
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   'Authorization',
    // )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(GLOBAL_PATH, app, document);
}

function enableCors(app) {
  if (!process.env.CORS_WHITELIST) {
    return;
  }

  const whitelist = process.env.CORS_WHITELIST.split(',');
  const options = {
    origin: whitelist,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(options);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
    cors: true,
  });

  const logger = app.get(AppLogger);

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', {
      reason: reason,
      promise: promise,
    });

    throw reason;
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    process.exit(1);
  });

  app.setGlobalPrefix(GLOBAL_PATH);

  // useGlobalPipes
  setGlobalPipes(app);
  // Setup swagger
  swaggerSetup(app);
  // Enable CORS on server only
  enableCors(app);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  logger.log(
    `Start service ${process.env.APP_NAME}, PORT: ${port}, ENV: ${process.env.NODE_ENV}`,
  );
}
bootstrap();
