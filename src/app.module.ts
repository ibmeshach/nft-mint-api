import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { NftsModule } from './nfts/nfts.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ApiKeyMiddleware } from './middleware/ApiKeyMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        API_KEY: Joi.string().required(),
      }),
    }),
    PrismaModule,
    NftsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude({ path: '/nfts/:nftId', method: RequestMethod.GET })
      .forRoutes('*path');
  }
}
