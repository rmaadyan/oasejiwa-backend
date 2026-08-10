import 'dotenv/config';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'; // 👈 1. Import Helmet

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  // 👈 2. Aktifkan Helmet untuk Proteksi HTTP Header
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // Agar file upload (gambar) tetap bisa diakses frontend
    }),
  );

  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
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

  // 👈 3. Perbaiki Logika CORS yang Bocor
  app.enableCors({
    origin: (origin, callback) => {
      // Izinkan request tanpa origin (misal dari Server-to-Server / Postman)
      if (!origin) return callback(null, true);

      const allowed =
        origin.startsWith('http://localhost') ||
        origin.startsWith('http://127.0.0.1') ||
        origin.startsWith('http://172.') ||
        origin.includes('oasejiwa.id');

      if (allowed) {
        callback(null, true);
      } else {
        // PERBAIKAN: Tolak origin yang tidak terdaftar
        callback(null, false);
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true,
  });

  // Catatan: app.useStaticAssets dihapus dari sini karena sudah ditangani oleh ServeStaticModule di app.module.ts

  const port = Number(process.env.PORT) || 3000;

  app.getHttpAdapter().getInstance().set('trust proxy', 1);

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