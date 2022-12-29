import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';
import { PartialRestaurantOwnerType } from '../types/partial-restaurant-owner.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<PartialRestaurantOwnerType> {
        const user = await this.authService.validateRestaurantOwner(username, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}