import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { RestaurantOwnerRepository } from '../repositories/restaurant-owner.repository';
import { RestaurantOwnerCreatedDto } from '../dtos/restaurant-owner-created.dto';

import { BcryptService } from '@xreats/nestjs-bcrypt';

@Injectable()
export class RestaurantOwnerService {
    constructor(
        private readonly restaurantOwnerRepository: RestaurantOwnerRepository,
        private readonly bcryptService: BcryptService
    ) {}

    async createRestaurantOwner(username: string, password: string): Promise<RestaurantOwnerCreatedDto> {
        const hashedPassword = await this.bcryptService.hash(password);
        
        const restaurantOwner = await this.restaurantOwnerRepository.createRestaurantOwner({
            id: uuidv4(),
            username,
            password: hashedPassword
        });

        return { id: restaurantOwner.id, username: restaurantOwner.username };
    }
}