import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JsonWebTokenDto } from '../dtos/json-web-token.dto';
import { RestaurantOwnerLoggedInDto } from '../dtos/restaurant-owner-logged-in.dto';

import { RestaurantOwnerService } from './restaurant-owner.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly restaurantOwnerService: RestaurantOwnerService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<RestaurantOwnerLoggedInDto> {
        const user = await this.restaurantOwnerService.findRestaurantOwnerByUsername(username);
        const passwordMatch = await this.restaurantOwnerService.compareRawPasswordWithHashedPassword(password, user.password);

        if(passwordMatch) {
            return { id: user.id, username: user.username };
        }

        return null;
    }

    async getJsonWebToken(user: RestaurantOwnerLoggedInDto): Promise<JsonWebTokenDto> {
        const payload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
