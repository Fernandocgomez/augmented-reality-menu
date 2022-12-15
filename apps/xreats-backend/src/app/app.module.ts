import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantOwnerModule } from '@xreats/nestjs-restaurant-owner';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/xreats'), RestaurantOwnerModule],
})

export class AppModule {}
