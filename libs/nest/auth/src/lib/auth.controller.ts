import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoggedInRestaurantOwnerDto } from './dto/logged-in-restaurant-owner.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SkipJwtAuthGuard } from '@xreats/nest/shared';
import { RestaurantOwner } from '@xreats/nest/shared';
import { JwtDto } from "./dto/jwt.dto";
import { ValidateJwtResponseDto } from './dto/validate-jwt-response.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SkipJwtAuthGuard()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Request() req
    ) {
        const restaurantOwner: RestaurantOwner = req.user;
        const access_token = await this.authService.getJsonWebToken(restaurantOwner);

        return new LoggedInRestaurantOwnerDto({
            access_token, 
            restaurantOwner
        });
    }

    @SkipJwtAuthGuard()
    @Post('validate-token')
    async validateToken(
        @Body() validateJwtDto: JwtDto
    ) {
        return new ValidateJwtResponseDto(
            await this.authService.validateToken(validateJwtDto.access_token)
        );
    }
}