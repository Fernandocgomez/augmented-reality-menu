import { Injectable } from "@nestjs/common";
import { BcryptService } from '@xreats/nest/bcrypt';

import { RestaurantOwnerRepository } from './restaurant-owner.repository';
import { RestaurantOwner } from "@xreats/nest/shared";

@Injectable()
export class RestaurantOwnerService {

    constructor(
        private readonly restaurantOwnerRepository: RestaurantOwnerRepository,
        private readonly bcryptService: BcryptService
    ) {}

    async create(username: string, password: string) {
        const hashedPassword = await this.bcryptService.hash(password);
        const createdRestaurantOwner = await this.restaurantOwnerRepository.create({username, password: hashedPassword});

        return await this.removeSensitiveProperties(createdRestaurantOwner);
    }

    async findOne(id: string) {
        const restaurantOwner = await this.restaurantOwnerRepository.findOne(id);

        return await this.removeSensitiveProperties(restaurantOwner);
    }

    private async removeSensitiveProperties(
        restaurantOwner: RestaurantOwner
    ): Promise<Partial<RestaurantOwner>> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, __v, ...rest } = await restaurantOwner;

		return await rest;
    }
}