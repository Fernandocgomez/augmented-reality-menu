import { Injectable } from '@nestjs/common';
import { RestaurantOwner } from '@xreats/nest/shared';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RestaurantOwnerAlreadyExistException } from './exceptions/restaurant-already-exist.exception';
import { RestaurantOwnerNotFoundException } from './exceptions/restaurant-owner-not-found.exception';
@Injectable()
export class RestaurantOwnerRepository {

    constructor(
        @InjectModel(RestaurantOwner.name) private readonly restaurantOwnerModel: Model<RestaurantOwner>
    ) {}

    async create(restaurantOwner: Partial<RestaurantOwner>) {
        const newRestaurantOwner = new this.restaurantOwnerModel(restaurantOwner);

        const restaurantOwnerDocument = await newRestaurantOwner.save().catch(() => {
            throw new RestaurantOwnerAlreadyExistException(restaurantOwner.username);
        });

        return await restaurantOwnerDocument.toObject<RestaurantOwner>();
    }

    async findOne(id: string) {
        const restaurantOwner = await this.restaurantOwnerModel.findOne({ id });

        if (!restaurantOwner) {
            throw new RestaurantOwnerNotFoundException();
        }

        return restaurantOwner.toObject<RestaurantOwner>();
    }
}