import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@visual-form-builder/nestjs-user';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb://localhost/demo')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
