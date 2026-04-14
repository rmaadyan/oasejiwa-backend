import * as dotenv from 'dotenv';
// PENTING: Harus di baris paling atas agar .env dimuat duluan
dotenv.config(); 

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`\n✅ Server jalan di: http://localhost:${port}`);
  console.log(`✅ DATABASE_URL terdeteksi: ${process.env.DATABASE_URL ? 'YA' : 'TIDAK'}\n`);
}
bootstrap();