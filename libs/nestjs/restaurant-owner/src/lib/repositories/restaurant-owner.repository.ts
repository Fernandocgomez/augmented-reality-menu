import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { RestaurantOwner, RestaurantOwnerDocument } from '../schemas/restaurant-owner.schema';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RestaurantOwnerRepository {
    constructor(@InjectModel(RestaurantOwner.name) private userModel: Model<RestaurantOwnerDocument>) { }

    async createRestaurantOwner(restaurantOwner: RestaurantOwner): Promise<RestaurantOwner> {
        const newRestaurantOwner = new this.userModel(restaurantOwner);

        return newRestaurantOwner.save().catch((e) => {
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `Username '${e.errors.username.value}' is already taken.`,
                },
                HttpStatus.BAD_REQUEST,
                { cause: new Error(e) }
            );
        });
    }
}