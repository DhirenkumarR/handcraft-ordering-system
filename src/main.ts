import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.MONGO_URI);
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform : true
    })
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  
  const config = new DocumentBuilder()
  .setTitle('Handcraft Ordering System')
  .setDescription('API Documentation')
  .setVersion('1.0')
  .addBearerAuth() 
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('server running on port',process.env.PORT ?? 3000);
  });
}
bootstrap();
