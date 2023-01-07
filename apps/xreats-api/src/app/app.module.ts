import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantOwnerModule } from '@xreats/nest/restaurant-owner';

@Module({
	imports: [MongooseModule.forRoot(process.env.NX_DB_URL), RestaurantOwnerModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
