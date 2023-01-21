import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BcryptService } from '@xreats/nest/bcrypt';

import { AuthRepository } from './auth.repository';
import { RestaurantOwner } from '@xreats/nest/shared';
import { RestaurantOwnerTransformerUtility } from '@xreats/shared-models';

@Injectable()
export class AuthService {
    private restaurantOwnerTransformerUtility = new RestaurantOwnerTransformerUtility();

    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepository: AuthRepository,
        private readonly bcryptService: BcryptService
    ) {}

    async validateRestaurantOwner(username: string, rawPassword: string) {
        const restaurantOwner = await this.authRepository.findByUsername(username);

        if(!restaurantOwner) {
            throw new UnauthorizedException('Invalid credentials');
        };

        const isPasswordValid = await this.bcryptService.compare(rawPassword, restaurantOwner.password);

        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        };

        return this.restaurantOwnerTransformerUtility.removeSensitiveProperties(restaurantOwner);
    }

    async getJsonWebToken(user: Partial<RestaurantOwner>) {
        const payload = { username: user.username, sub: user._id };

		return this.jwtService.sign(payload, {
            secret: process.env.NX_JWT_SECRET,
        });
    }

    async validateToken(token: string)  {
		const decodedToken = await this.jwtService.decode(token);

		if(!decodedToken) {
			return {
				statusCode: 201,
				message: ['Invalid token'],
				isTokenValid: false,
				restaurantOwner: null
			}
		}

		const restaurantOwner = await this.authRepository.findById(
			decodedToken.sub
		);

		return this.jwtService.verifyAsync(token, { secret: process.env.NX_JWT_SECRET })
        .then(() => {
            return {
                statusCode: 201,
                message: ['Valid token'],
                isTokenValid: true,
				restaurantOwner: this.restaurantOwnerTransformerUtility.removeSensitiveProperties(restaurantOwner),
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
};