import { Injectable, Logger } from '@nestjs/common';

export interface EnvironmentVariables {
  DATABASE_URL: string;
  PORT: string;
  NODE_ENV: string;
}

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly config: EnvironmentVariables;

  constructor() {
    this.config = this.validateEnvironment();
  }

  private validateEnvironment(): EnvironmentVariables {
    const requiredEnvVars = ['DATABASE_URL', 'PORT'];
    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar],
    );

    if (missingEnvVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingEnvVars.join(', ')}`,
      );
    }

    return {
      DATABASE_URL: process.env.DATABASE_URL!,
      PORT: process.env.PORT || '3000',
      NODE_ENV: process.env.NODE_ENV || 'development',
    };
  }

  get databaseUrl(): string {
    return this.config.DATABASE_URL;
  }

  get port(): number {
    return parseInt(this.config.PORT, 10);
  }

  get nodeEnv(): string {
    return this.config.NODE_ENV;
  }

  get isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  get isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  logConfiguration(): void {
    this.logger.log(`✓ Environment: ${this.nodeEnv}`);
    this.logger.log(`✓ Port: ${this.port}`);
    this.logger.log(
      `✓ Database URL: ${this.databaseUrl.split('@')[1] || 'configured'}`,
    );
  }
}
