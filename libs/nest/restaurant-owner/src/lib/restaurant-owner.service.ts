import { Injectable } from "@nestjs/common";

import { RestaurantOwnerRepository } from './restaurant-owner.repository';
import { RestaurantOwner } from "./schemas/restaurant-owner.schema";


@Injectable()
export class RestaurantOwnerService {

    constructor(private readonly restaurantOwnerRepository: RestaurantOwnerRepository) {}

    async create(username: string, password: string) {
        const createdRestaurantOwner = await this.restaurantOwnerRepository.create({username, password});

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