import 'dotenv/config';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express'; // 🟢 Import parser express
import { join } from 'path';
import * as express from 'express';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use((cookieParser as any)());

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

  const isDocker = process.cwd().includes('app') || process.env.NODE_ENV === 'production' || require('fs').existsSync('/.dockerenv');
  const port = isDocker ? 3001 : (Number(process.env.PORT) || 3001);

  await app.listen(port, '0.0.0.0', () => {
    logger.log(`Server jalan di: http://0.0.0.0:${port}`);
    logger.log(
      `DATABASE_URL terdeteksi: ${process.env.DATABASE_URL ? 'YA' : 'TIDAK'}`,
    );
  });
}

bootstrapWithRetry().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error(`Gagal start aplikasi setelah retry: ${error.message}`, error.stack);
  process.exit(1);
});

async function bootstrapWithRetry(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await bootstrap();
      return;
    } catch (err: any) {
      console.error(`[Bootstrap] Attempt ${i + 1}/${retries} failed: ${err.message}. Retrying in ${delay}ms...`);
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

