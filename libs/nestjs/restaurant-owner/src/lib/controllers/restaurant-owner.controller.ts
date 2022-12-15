import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";

import { CreateRestaurantOwnerDto } from "../dtos/create-restaurant-owner.dto";
import { RestaurantOwnerCreatedDto } from "../dtos/restaurant-owner-created.dto";
import { RestaurantOwnerService } from "../services/restaurant-owner.service";


@Controller('restaurant-owners')
export class RestaurantOwnerController {
    constructor(private readonly restaurantOwnerService: RestaurantOwnerService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createRestaurantOwner(@Body() createRestaurantOwnerDto: CreateRestaurantOwnerDto): Promise<RestaurantOwnerCreatedDto> {
        const { username, password } = createRestaurantOwnerDto;

        return this.restaurantOwnerService.createRestaurantOwner(
            username,
            password
        );
    }
}