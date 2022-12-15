import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { RestaurantOwnerRepository } from '../repositories/restaurant-owner.repository';
import { RestaurantOwnerCreatedDto } from '../dtos/restaurant-owner-created.dto';

@Injectable()
export class RestaurantOwnerService {
    constructor(private readonly restaurantOwnerRepository: RestaurantOwnerRepository) {}

    async createRestaurantOwner(username: string, password: string): Promise<RestaurantOwnerCreatedDto> {
        const restaurantOwner = await this.restaurantOwnerRepository.createRestaurantOwner({
            id: uuidv4(),
            username,
            password,
        });

        return { id: restaurantOwner.id, username: restaurantOwner.username };
    }
}