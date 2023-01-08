import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { RestaurantOwner } from '@xreats/nest/shared';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<Partial<RestaurantOwner>> {
        const user = await this.authService.validateRestaurantOwner(username, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}