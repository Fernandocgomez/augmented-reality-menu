import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantOwner } from '@xreats/nest/shared';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectModel(RestaurantOwner.name) private readonly restaurantOwnerModel: Model<RestaurantOwner>
    ) {}

    async findByUsername(username: string) {
		const restaurantOwner = await this.restaurantOwnerModel.findOne({
			username,
		});

		if (!restaurantOwner) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return restaurantOwner.toObject<RestaurantOwner>();
	}

	async findById(id: string) {
		const restaurantOwner = await this.restaurantOwnerModel.findOne({ _id: id });

		if (!restaurantOwner) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return restaurantOwner.toObject<RestaurantOwner>();
	}
}
