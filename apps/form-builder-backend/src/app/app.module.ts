import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@visual-form-builder/nestjs-user';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb://localhost/demo')],
})
export class AppModule {}
