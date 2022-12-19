import { Controller, Post, Request, UseGuards } from "@nestjs/common";

import { SkipJwtAuthGuard } from "@xreats/shared";

import { AuthService } from "./auth.service";

import { JsonWebTokenDto } from "./dtos/json-web-token.dto";
import { RestaurantOwnerLoggedInDto } from "./dtos/restaurant-owner-logged-in.dto";

import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SkipJwtAuthGuard()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<JsonWebTokenDto> {
        const user: RestaurantOwnerLoggedInDto = req.user;

        return this.authService.getJsonWebToken(user);
    }
}