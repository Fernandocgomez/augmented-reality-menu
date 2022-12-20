import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import mongooseUniqueValidatorPlugin = require('mongoose-unique-validator');

import { RestaurantOwnerController } from './controllers/restaurant-owner.controller';
import { AuthController } from './controllers/auth.controller';

import {
  RestaurantOwner,
  RestaurantOwnerSchema,
} from './schemas/restaurant-owner.schema';

import { RestaurantOwnerService } from './services/restaurant-owner.service';
import { AuthService } from './services/auth.service';
import { RestaurantOwnerRepository } from './repositories/restaurant-owner.repository';

import { BcryptModule } from '@xreats/nestjs-bcrypt';

import { LocalStrategy } from './passport-strategies/local.strategy';
import { JwtStrategy } from './passport-strategies/jwt.strategy';

import { JwtAuthGuard } from '@xreats/nestjs-shared';

const GlobalJwtAuthGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

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
    JwtModule.register({
      secret: process.env.NX_JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    BcryptModule,
    PassportModule,
  ],
  controllers: [RestaurantOwnerController, AuthController],
  providers: [
    RestaurantOwnerService,
    RestaurantOwnerRepository,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GlobalJwtAuthGuard,
  ],
})
export class RestaurantOwnerModule {}
