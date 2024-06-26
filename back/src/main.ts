import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Esto no es seguro, pero como es un servidor local lo hago de esta manera
  app.enableCors();
  ////
  
  await app.listen(3000);
}
bootstrap();
