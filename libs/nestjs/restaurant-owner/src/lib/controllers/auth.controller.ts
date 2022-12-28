import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { SkipJwtAuthGuard } from '@xreats/shared-models';

import { RestaurantOwnerLoginDataDto } from '../dtos/restaurant-owner-login-data.dto';

import { LocalAuthGuard } from '../guards/local-auth.guard';

import { AuthService } from '../services/auth.service';
import { PartialRestaurantOwnerType } from '../types/partial-restaurant-owner.type';

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
}
