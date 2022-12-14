import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import mongooseUniqueValidatorPlugin = require('mongoose-unique-validator');

import { BcryptModule } from '@visual-form-builder/nestjs-bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.plugin(mongooseUniqueValidatorPlugin);

          return schema;
        },
      },
    ]),
    BcryptModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
