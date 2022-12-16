import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";

import { CreateRestaurantOwnerDto } from "../dtos/create-restaurant-owner.dto";
import { RestaurantOwnerCreatedDto } from "../dtos/restaurant-owner-created.dto";
import { RestaurantOwnerRetrievedDto } from "../dtos/restaurant-owner-retrieved.dto";
import { RestaurantOwnerUpdatedDto } from "../dtos/restaurant-owner-updated.dto";
import { UpdateRestaurantOwnerDto } from "../dtos/update-restaurant-owner.dto";
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

    @Get(':id')
    async findRestaurantOwnerById(@Param('id') restaurantOwnerId: string): Promise<RestaurantOwnerRetrievedDto> {
        return this.restaurantOwnerService.findRestaurantOwnerById(restaurantOwnerId);
    }

    @Patch(':id')
    async updateRestaurantOwner(
        @Param('id') restaurantOwnerId: string, 
        @Body() updateRestaurantOwnerDto: UpdateRestaurantOwnerDto
    ): Promise<RestaurantOwnerUpdatedDto> {
        return this.restaurantOwnerService.updateRestaurantOwner(
            restaurantOwnerId, 
            updateRestaurantOwnerDto
        );
    }
}