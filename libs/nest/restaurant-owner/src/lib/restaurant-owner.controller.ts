import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { SkipJwtAuthGuard } from '@xreats/nest/shared';

import { CreateRestaurantOwnerDto } from "./dtos/create-restaurant-owner.dto";
import { RestaurantOwnerService } from "./restaurant-owner.service";

@Controller('restaurant-owners')
export class RestaurantOwnerController {
    constructor(private readonly restaurantOwnerService: RestaurantOwnerService) {}

    @SkipJwtAuthGuard()
    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body() createRestaurantOwnerDto: CreateRestaurantOwnerDto
    ) {
        const { username, password } = createRestaurantOwnerDto;

        return this.restaurantOwnerService.create(username, password);
    };

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.restaurantOwnerService.findOne(id);
    }

}
