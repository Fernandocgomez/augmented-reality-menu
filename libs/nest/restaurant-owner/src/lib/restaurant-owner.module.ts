import { Module } from '@nestjs/common';
import { RestaurantOwnerController } from './restaurant-owner.controller';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { RestaurantOwnerRepository } from './restaurant-owner.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantOwner, RestaurantOwnerSchema } from './schemas/restaurant-owner.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: RestaurantOwner.name, schema: RestaurantOwnerSchema }
		]),
	],
	controllers: [RestaurantOwnerController],
	providers: [RestaurantOwnerService, RestaurantOwnerRepository],
	exports: [],
})
export class RestaurantOwnerModule {}
