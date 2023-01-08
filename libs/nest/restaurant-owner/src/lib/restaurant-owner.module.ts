import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptModule } from '@xreats/nest/bcrypt';

import { RestaurantOwnerController } from './restaurant-owner.controller';
import { RestaurantOwnerRepository } from './restaurant-owner.repository';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { RestaurantOwner, RestaurantOwnerSchema } from './schemas/restaurant-owner.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: RestaurantOwner.name, schema: RestaurantOwnerSchema }
		]),
		BcryptModule
	],
	controllers: [RestaurantOwnerController],
	providers: [RestaurantOwnerService, RestaurantOwnerRepository],
})
export class RestaurantOwnerModule {}
