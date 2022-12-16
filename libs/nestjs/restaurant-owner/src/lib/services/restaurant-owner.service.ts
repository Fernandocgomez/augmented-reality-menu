import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { BcryptService } from '@xreats/nestjs-bcrypt';

import { RestaurantOwnerRetrievedDto } from '../dtos/restaurant-owner-retrieved.dto';
import { RestaurantOwnerUpdatedDto } from '../dtos/restaurant-owner-updated.dto';
import { UpdateRestaurantOwnerDto } from '../dtos/update-restaurant-owner.dto';
import { RestaurantOwnerCreatedDto } from '../dtos/restaurant-owner-created.dto';

import { RestaurantOwnerRepository } from '../repositories/restaurant-owner.repository';

@Injectable()
export class RestaurantOwnerService {
    constructor(
        private readonly restaurantOwnerRepository: RestaurantOwnerRepository,
        private readonly bcryptService: BcryptService
    ) {}

    async createRestaurantOwner(username: string, password: string): Promise<RestaurantOwnerCreatedDto> {
        const hashedPassword = await this.hashPassword(password);
        
        const restaurantOwner = await this.restaurantOwnerRepository.createRestaurantOwner({
            id: uuidv4(),
            username,
            password: hashedPassword
        });

        return { id: restaurantOwner.id, username: restaurantOwner.username };
    }

    async findRestaurantOwnerById(id: string): Promise<RestaurantOwnerRetrievedDto> {
        const restaurantOwner = await this.restaurantOwnerRepository.findRestaurantOwnerById(id);

        return { id: restaurantOwner.id, username: restaurantOwner.username };
    } 

    async updateRestaurantOwner(
        restaurantOwnerId: string, 
        updateRestaurantOwnerDto: UpdateRestaurantOwnerDto
    ): Promise<RestaurantOwnerUpdatedDto> {
        let updateRestaurantOwnerDtoCopy = {...updateRestaurantOwnerDto};

        if(updateRestaurantOwnerDtoCopy?.password) {
            const hashedPassword = await this.hashPassword(updateRestaurantOwnerDtoCopy.password); 

            updateRestaurantOwnerDtoCopy = {
                ...updateRestaurantOwnerDtoCopy,
                password: hashedPassword
            }
        }

        const updatedRestaurantOwner = await this.restaurantOwnerRepository.updateRestaurantOwnerById(
            { id: restaurantOwnerId },
            updateRestaurantOwnerDtoCopy
        );

        return { id: updatedRestaurantOwner.id, username: updatedRestaurantOwner.username };
    }

    private async hashPassword(password: string): Promise<string> {
        return await this.bcryptService.hash(password);
    }
}