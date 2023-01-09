import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateTokenResponseInterface } from '@xreats/shared-models';

import { PartialRestaurantOwnerType } from '../types/partial-restaurant-owner.type';
import { RestaurantOwnerTransformerUtility } from './../utilities/restaurant-owner-transformer.utility';
import { RestaurantOwnerService } from './restaurant-owner.service';

@Injectable()
export class AuthService {
	private restaurantOwnerTransformer = new RestaurantOwnerTransformerUtility();

	constructor(
		private readonly restaurantOwnerService: RestaurantOwnerService,
		private readonly jwtService: JwtService
	) {}

	async validateRestaurantOwner(
		username: string,
		password: string
	): Promise<PartialRestaurantOwnerType> {
		const restaurantOwner = await this.restaurantOwnerService.findRestaurantOwnerByUsername(
			username
		);
		const passwordMatch = await this.restaurantOwnerService.compareRawPasswordWithHashedPassword(
			password,
			restaurantOwner.password
		);

		if (passwordMatch) {
			return await this.restaurantOwnerTransformer.removeSensitiveProperties(restaurantOwner);
		}

		throw new UnauthorizedException('Invalid credentials');
	}

	async getJsonWebToken(user: PartialRestaurantOwnerType): Promise<string> {
		const payload = { username: user.username, sub: user.id };

		return this.jwtService.sign(payload);
	}

	async validateToken(token: string): Promise<ValidateTokenResponseInterface>  {
		const decodedToken = await this.jwtService.decode(token);

		if(!decodedToken) {
			return {
				statusCode: 201,
				message: ['Invalid token'],
				isTokenValid: false,
				restaurantOwner: null
			}
		}

		const restaurantOwner = await this.restaurantOwnerService.findRestaurantOwnerById(
			decodedToken.sub
		);

		return this.jwtService.verifyAsync(token, { secret: process.env.NX_JWT_SECRET })
        .then(() => {
            return {
                statusCode: 201,
                message: ['Valid token'],
                isTokenValid: true,
				restaurantOwner: restaurantOwner
            }
        })
        .catch(() => {
            return {
                statusCode: 201,
                message: ['Invalid token'],
                isTokenValid: false,
				restaurantOwner: null
            }
        })
	}
}
