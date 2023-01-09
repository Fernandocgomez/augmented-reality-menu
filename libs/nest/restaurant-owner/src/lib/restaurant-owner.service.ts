import { Injectable } from "@nestjs/common";
import { BcryptService } from '@xreats/nest/bcrypt';

import { RestaurantOwnerRepository } from './restaurant-owner.repository';
import { RestaurantOwnerTransformerUtility } from "@xreats/nest/shared";

@Injectable()
export class RestaurantOwnerService {
    private restaurantOwnerTransformerUtility = new RestaurantOwnerTransformerUtility();

    constructor(
        private readonly restaurantOwnerRepository: RestaurantOwnerRepository,
        private readonly bcryptService: BcryptService
    ) {}

    async create(username: string, password: string) {
        const hashedPassword = await this.bcryptService.hash(password);
        const createdRestaurantOwner = await this.restaurantOwnerRepository.create({username, password: hashedPassword});

        return this.restaurantOwnerTransformerUtility.removeSensitiveProperties(createdRestaurantOwner);
    }

    async findOne(id: string) {
        const restaurantOwner = await this.restaurantOwnerRepository.findOne(id);

        return this.restaurantOwnerTransformerUtility.removeSensitiveProperties(restaurantOwner);
    }
}