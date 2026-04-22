import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  // Apply global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for development
  if (configService.isDevelopment) {
    app.enableCors({
      origin: 'http://localhost:3001',
      credentials: true,
    });
  }

  // Log configuration
  configService.logConfiguration();

  const port = configService.port;
  await app.listen(port, () => {
    logger.log(`✓ Server is running on http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error(`✗ Failed to start application: ${error.message}`, error.stack);
  process.exit(1);
});
