import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantOwnerModule } from '@xreats/nestjs-restaurant-owner';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.NX_DB_URL), 
    RestaurantOwnerModule
  ]
})

export class AppModule {}
