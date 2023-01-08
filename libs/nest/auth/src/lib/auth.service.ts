import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BcryptService } from '@xreats/nest/bcrypt';

import { AuthRepository } from './auth.repository';
import { RestaurantOwner } from './schemas/restaurant-owner.schema';

@Injectable()
export class AuthService {
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

        return await this.removeSensitiveProperties(restaurantOwner);
    }

    async getJsonWebToken(user: RestaurantOwner) {
        const payload = { username: user.username, sub: user._id };

		return this.jwtService.sign(payload, {
            secret: process.env.NX_JWT_SECRET,
        });
    }

    private async removeSensitiveProperties(
        restaurantOwner: RestaurantOwner
    ): Promise<Partial<RestaurantOwner>> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, __v, ...rest } = await restaurantOwner;

		return await rest;
    }
};