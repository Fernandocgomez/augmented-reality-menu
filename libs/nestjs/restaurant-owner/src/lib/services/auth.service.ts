import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PartialRestaurantOwnerType } from '../types/partial-restaurant-owner.type';

import { RestaurantOwnerService } from './restaurant-owner.service';

import { RestaurantOwnerTransformerUtility } from './../utilities/restaurant-owner-transformer.utility';

@Injectable()
export class AuthService {
    private restaurantOwnerTransformer = new RestaurantOwnerTransformerUtility();

    constructor(
        private readonly restaurantOwnerService: RestaurantOwnerService,
        private readonly jwtService: JwtService
    ) {}

    async validateRestaurantOwner(username: string, password: string): Promise<PartialRestaurantOwnerType> {
        const restaurantOwner = await this.restaurantOwnerService.findRestaurantOwnerByUsername(username);
        const passwordMatch = await this.restaurantOwnerService.compareRawPasswordWithHashedPassword(password, restaurantOwner.password);

        if(passwordMatch) {
            return await this.restaurantOwnerTransformer.removeSensitiveProperties(restaurantOwner);
        }

        throw new UnauthorizedException('Invalid credentials');
    }

    async getJsonWebToken(user: PartialRestaurantOwnerType): Promise<string> {
        const payload = { username: user.username, sub: user.id };

        return this.jwtService.sign(payload);
    }
}
