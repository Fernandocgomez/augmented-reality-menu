import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@xreats/nestjs-auth';

import { RestaurantOwnerModule } from '@xreats/nestjs-restaurant-owner';

import { JwtAuthGuard } from '@xreats/shared';

const GlobalJwtAuthGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
}

@Module({
  imports: [
    MongooseModule.forRoot(process.env.NX_DB_URL), 
    RestaurantOwnerModule, 
    AuthModule
  ],
  providers: [
    GlobalJwtAuthGuard
  ]
})

export class AppModule {}
