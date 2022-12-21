import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// https://github.com/nestjs/nest/tree/master/sample/24-serve-static

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
