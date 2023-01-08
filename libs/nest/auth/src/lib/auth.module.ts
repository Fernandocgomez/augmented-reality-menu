import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantOwnerSchema, RestaurantOwner } from './schemas/restaurant-owner.schema';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const GlobalJwtAuthGuard = {
	provide: APP_GUARD,
	useClass: JwtAuthGuard,
  };

@Module({
	controllers: [AuthController],
	providers: [
		AuthService, 
		AuthRepository, 
		JwtService, 
		LocalStrategy, 
		JwtStrategy,
		GlobalJwtAuthGuard
	],
	imports: [
	JwtModule.register({
			secret: process.env.NX_JWT_SECRET,
			signOptions: {
				expiresIn: '7d',
			},
		}),
		MongooseModule.forFeature([
			{
				name: RestaurantOwner.name,
				schema: RestaurantOwnerSchema,
			},
		]),
	],
})
export class AuthModule {}
