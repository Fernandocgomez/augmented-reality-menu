import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@xreats/nest/auth';
import { RestaurantOwnerModule } from '@xreats/nest/restaurant-owner';
import { GlobalHttpExceptionFilter } from '@xreats/nest/shared';

@Module({
	imports: [
		MongooseModule.forRoot(process.env.NX_DB_URL), 
		RestaurantOwnerModule,
		AuthModule,
	],
	controllers: [],
	providers: [
		GlobalHttpExceptionFilter
	],
})
export class AppModule {}
