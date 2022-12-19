import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import mongooseUniqueValidatorPlugin = require('mongoose-unique-validator');

import { RestaurantOwnerController } from './controllers/restaurant-owner.controller';
import { RestaurantOwnerRepository } from './repositories/restaurant-owner.repository';
import { RestaurantOwner, RestaurantOwnerSchema } from './schemas/restaurant-owner.schema';
import { RestaurantOwnerService } from './services/restaurant-owner.service';

import { BcryptModule } from '@xreats/nestjs-bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: RestaurantOwner.name,
        useFactory: () => {
          const schema = RestaurantOwnerSchema;

          schema.plugin(mongooseUniqueValidatorPlugin);

          return schema;
        },
      },
    ]),
    BcryptModule,
  ],
  controllers: [RestaurantOwnerController],
  providers: [
    RestaurantOwnerService,
    RestaurantOwnerRepository,
  ],
  exports: [RestaurantOwnerService]
})
export class RestaurantOwnerModule { }
