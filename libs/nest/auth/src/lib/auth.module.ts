import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptModule } from '@xreats/nest/bcrypt';

import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { RestaurantOwner, RestaurantOwnerSchema } from '@xreats/nest/shared';

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
		BcryptModule
	],
})
export class AuthModule {}
