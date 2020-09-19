/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.WEB_APP_PORT || 3200;

  app.use(helmet());
  app.enableCors();
  app.use(compression());

  app.use(
    rateLimit({
      windowMs: process.env.API_RATE_LIMIT || 900000, //  Equals to 15 minutes
      max: process.env.API_RATE_LIMIT_REQUESTS || 100, // limit each IP to 100 requests per windowMs
    })
  );

  await app.listen(port, () => {
    Logger.debug('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
