import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';  // Import dotenv package

dotenv.config();  // Load environment variables from .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);  // Use the PORT from .env, default to 3000 if not provided
}
bootstrap();

