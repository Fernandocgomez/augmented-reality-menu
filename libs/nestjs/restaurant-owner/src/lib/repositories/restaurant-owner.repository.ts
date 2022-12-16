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
                    message: `Username '${e.errors.username.value}' already exist.`,
                },
                HttpStatus.BAD_REQUEST
            );
        });
    }

    async findRestaurantOwnerById(id: string): Promise<RestaurantOwner> {
        const restaurantOwner = await this.restaurantOwnerModel.findOne({ id });

        if (!restaurantOwner) {
            this.throwNotFoundException();
        }

        return restaurantOwner;
    }

    async updateRestaurantOwnerById(restaurantOwnerQuery: FilterQuery<RestaurantOwner>, partialRestaurantOwner: Partial<RestaurantOwner>): Promise<RestaurantOwner> {
        const restaurantOwner = await this.restaurantOwnerModel.findOneAndUpdate(restaurantOwnerQuery, partialRestaurantOwner, { new: true });
    
        if (!restaurantOwner) {
            this.throwNotFoundException();
        }

        return restaurantOwner;
    }

    async deleteRestaurantOwnerById(id: string): Promise<RestaurantOwner> {
        const restaurantOwner = await this.restaurantOwnerModel.findOneAndDelete({ id });

        if (!restaurantOwner) {
            this.throwNotFoundException();
        }
    
        return restaurantOwner;
    }

    private throwNotFoundException() {
        throw new HttpException(
            {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Restaurant owner not found`
            },
            HttpStatus.NOT_FOUND
        )
    }
    
}