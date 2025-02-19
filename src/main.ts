import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // Configure CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://nft-minting-backend-production.up.railway.app',
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('NFT Minting API')
    .setDescription('The NFT Minting API Backend for storing NFTs metadatas')
    .setVersion('1.0')
    .addTag('NFT')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API key for authentication',
      },
      'x-api-key',
    )
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('swagger/api', app, documentFactory, {
    jsonDocumentUrl: '/swagger/api-json',
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
