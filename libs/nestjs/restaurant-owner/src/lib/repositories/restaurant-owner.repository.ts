import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { RestaurantOwner, RestaurantOwnerDocument } from '../schemas/restaurant-owner.schema';

import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RestaurantOwnerRepository {
    constructor(@InjectModel(RestaurantOwner.name) private restaurantOwnerModel: Model<RestaurantOwnerDocument>) { }

    async createRestaurantOwner(restaurantOwner: RestaurantOwner): Promise<RestaurantOwner> {
        const newRestaurantOwner = new this.restaurantOwnerModel(restaurantOwner);

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

    async findRestaurantOwnerById(id: string): Promise<RestaurantOwner> {
        const restaurantOwner = await this.restaurantOwnerModel.findOne({ id: id });

        if (!restaurantOwner) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Restaurant owner with id:${id} not found`
                },
                HttpStatus.NOT_FOUND
            )
        }

        return restaurantOwner;
    }

    async updateRestaurantOwnerById(
        restaurantOwnerQuery: FilterQuery<RestaurantOwner>,
        partialRestaurantOwner: Partial<RestaurantOwner>
    ): Promise<RestaurantOwner> {
        return this.restaurantOwnerModel.findOneAndUpdate(restaurantOwnerQuery, partialRestaurantOwner, { new: true });
    }
}