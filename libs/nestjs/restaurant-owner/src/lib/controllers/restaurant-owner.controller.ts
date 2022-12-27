import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { SkipJwtAuthGuard } from '@xreats/shared-models';

import { CreateRestaurantOwnerDto } from '../dtos/create-restaurant-owner.dto';
import { RestaurantOwnerCreatedDto } from '../dtos/restaurant-owner-created.dto';
import { RestaurantOwnerDeleted } from '../dtos/restaurant-owner-deleted.dto';
import { RestaurantOwnerRetrievedDto } from '../dtos/restaurant-owner-retrieved.dto';
import { RestaurantOwnerUpdatedDto } from '../dtos/restaurant-owner-updated.dto';
import { UpdateRestaurantOwnerDto } from '../dtos/update-restaurant-owner.dto';
import { RestaurantOwnerAccessControlGuard } from '../guards/restaurant-owner-access-control.guard';

import { RestaurantOwnerService } from '../services/restaurant-owner.service';

@Controller('restaurant-owners')
export class RestaurantOwnerController {
  constructor(
    private readonly restaurantOwnerService: RestaurantOwnerService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @SkipJwtAuthGuard()
  async createRestaurantOwner(
    @Body() createRestaurantOwnerDto: CreateRestaurantOwnerDto
  ): Promise<RestaurantOwnerCreatedDto> {
    const { username, password } = createRestaurantOwnerDto;

    return this.restaurantOwnerService.createRestaurantOwner(
      username,
      password
    );
  }

  @UseGuards(RestaurantOwnerAccessControlGuard)
  @Get(':id')
  async findRestaurantOwnerById(
    @Param('id') restaurantOwnerId: string
  ): Promise<RestaurantOwnerRetrievedDto> {
    return this.restaurantOwnerService.findRestaurantOwnerById(
      restaurantOwnerId
    );
  }

  @UseGuards(RestaurantOwnerAccessControlGuard)
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

  @UseGuards(RestaurantOwnerAccessControlGuard)
  @Delete(':id')
  async deleteRestaurantOwner(
    @Param('id') restaurantOwnerId
  ): Promise<RestaurantOwnerDeleted> {
    return this.restaurantOwnerService.deleteRestaurantOwner(restaurantOwnerId);
  }
}
