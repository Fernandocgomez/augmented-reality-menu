import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';

import { SkipJwtAuthGuard } from '@xreats/nestjs/shared';
import { ValidateTokenResponseInterface } from '@xreats/shared-models';

import { RestaurantOwnerLoginDataDto } from '../dtos/restaurant-owner-login-data.dto';

import { LocalAuthGuard } from '../guards/local-auth.guard';

import { AuthService } from '../services/auth.service';
import { PartialRestaurantOwnerType } from '../types/partial-restaurant-owner.type';
import { ValidateJwtDto } from './../dtos/validate-jwt.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@SkipJwtAuthGuard()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req): Promise<RestaurantOwnerLoginDataDto> {
		const restaurantOwner: PartialRestaurantOwnerType = req.user;
		const access_token = await this.authService.getJsonWebToken(restaurantOwner);

		return { access_token, restaurantOwner };
	}

	@SkipJwtAuthGuard()
	@Post('validate-token')
	async validateToken(
		@Body() validateJwtDto: ValidateJwtDto
	): Promise<ValidateTokenResponseInterface> {
		return await this.authService.validateToken(validateJwtDto.access_token);
	}
}
