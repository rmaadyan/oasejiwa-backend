import 'dotenv/config';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParserModule from 'cookie-parser';
import { json, urlencoded } from 'express';
import { join } from 'path';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  // 🟢 Naikkan batas body request ke 50MB
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // 🟢 Cookie Parser Handler yang kompatibel dengan CommonJS & ESM (tsx)
  const cookieMiddleware = (cookieParserModule as any).default || cookieParserModule;
  app.use(cookieMiddleware());

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        console.log('Validation errors:', JSON.stringify(errors, null, 2));
        return new BadRequestException(errors);
      },
    }),
  );

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed =
        origin.startsWith('http://localhost') ||
        origin.startsWith('http://127.0.0.1') ||
        origin.startsWith('http://172.') ||
        origin.includes('oasejiwa.id');
      if (allowed) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true,
  });

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  const port = Number(process.env.PORT) || 3001;

  await app.listen(port, () => {
    logger.log(`Server jalan di: http://localhost:${port}`);
    logger.log(`DATABASE_URL terdeteksi: ${process.env.DATABASE_URL ? 'YA' : 'TIDAK'}`);
  });
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error(`Gagal start aplikasi: ${error.message}`, error.stack);
  process.exit(1);
});