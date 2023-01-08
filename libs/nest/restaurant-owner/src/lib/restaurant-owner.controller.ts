import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { SkipJwtAuthGuard } from '@xreats/nest/shared';
import { CreateRestaurantOwnerDto } from "@xreats/nest/shared";

import { RestaurantOwnerAccessControlGuard } from './guards/restaurant-owner-access-control.guard';
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

    @UseGuards(RestaurantOwnerAccessControlGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.restaurantOwnerService.findOne(id);
    }

}
