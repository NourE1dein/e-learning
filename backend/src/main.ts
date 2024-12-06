import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';  // Import dotenv package
import { Logger } from '@nestjs/common';

dotenv.config();  // Load environment variables from .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT
  await app.listen(port|| 8000);
  Logger.log(`server is on Port ${port} \n` , `http://localhost:${port}`)  
}
bootstrap();
