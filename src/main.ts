import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('tests');
  console.log('test 2');
  console.log('tests 233');
  
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
