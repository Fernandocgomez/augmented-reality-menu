import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import mongooseUniqueValidatorPlugin = require('mongoose-unique-validator');

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.plugin(mongooseUniqueValidatorPlugin);

          return schema;
        }
      },
    ]),
  ],
  providers: [UserRepository, UserService],
  controllers: [UserController],
})
export class UserModule {}