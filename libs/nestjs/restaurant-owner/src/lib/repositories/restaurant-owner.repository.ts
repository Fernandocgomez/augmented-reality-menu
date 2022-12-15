import { Injectable } from '@nestjs/common';

import { RestaurantOwner, RestaurantOwnerDocument } from '../schemas/restaurant-owner.schema';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RestaurantOwnerRepository {
    constructor(@InjectModel(RestaurantOwner.name) private userModel: Model<RestaurantOwnerDocument>) {}

    async createRestaurantOwner(restaurantOwner: RestaurantOwner): Promise<RestaurantOwner> {
        const newRestaurantOwner = new this.userModel(restaurantOwner);

        return newRestaurantOwner.save();
    }
}