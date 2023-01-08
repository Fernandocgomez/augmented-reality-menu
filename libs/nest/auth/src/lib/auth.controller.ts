import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoggedInRestaurantOwnerDto } from './dto/logged-in-restaurant-owner.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SkipJwtAuthGuard } from './decorators/skip-jwt-auth-guard.decorator';
import { RestaurantOwner } from './schemas/restaurant-owner.schema';

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
}