import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { RestaurantOwner, RestaurantOwnerDocument } from '../schemas/restaurant-owner.schema';

import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { RestaurantOwnerLeanDocumentType } from '../types/restaurant-owner-lean-document.type';

import { PartialRestaurantOwnerType } from '../types/partial-restaurant-owner.type';

@Injectable()
export class RestaurantOwnerRepository {
	constructor(
		@InjectModel(RestaurantOwner.name) private restaurantOwnerModel: Model<RestaurantOwnerDocument>
	) {}

	async createRestaurantOwner(
		restaurantOwner: RestaurantOwner
	): Promise<RestaurantOwnerLeanDocumentType> {
		const newRestaurantOwner = new this.restaurantOwnerModel(restaurantOwner);

		const restaurantOwnerDocument = await newRestaurantOwner.save().catch((e) => {
			throw new BadRequestException(`Username '${e.errors.username.value}' already exist.`,);
		});

		return await restaurantOwnerDocument.toObject();
	}

	async findRestaurantOwnerById(id: string): Promise<RestaurantOwnerLeanDocumentType> {
		const restaurantOwner = await this.restaurantOwnerModel.findOne({ id });

		if (!restaurantOwner) {
			this.throwNotFoundException();
		}

		return restaurantOwner.toObject();
	}

	async findRestaurantOwnerByUsername(username: string): Promise<RestaurantOwnerLeanDocumentType> {
		const restaurantOwner = await this.restaurantOwnerModel.findOne({
			username,
		});

		if (!restaurantOwner) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return restaurantOwner.toObject();
	}

	async updateRestaurantOwnerById(
		restaurantOwnerQuery: FilterQuery<RestaurantOwner>,
		partialRestaurantOwner: PartialRestaurantOwnerType
	): Promise<RestaurantOwnerLeanDocumentType> {
		const restaurantOwner = await this.restaurantOwnerModel.findOneAndUpdate(
			restaurantOwnerQuery,
			partialRestaurantOwner,
			{ new: true }
		);

		if (!restaurantOwner) {
			this.throwNotFoundException();
		}

		return restaurantOwner.toObject();
	}

	async deleteRestaurantOwnerById(id: string): Promise<RestaurantOwnerLeanDocumentType> {
		const restaurantOwner = await this.restaurantOwnerModel.findOneAndDelete({
			id,
		});

		if (!restaurantOwner) {
			this.throwNotFoundException();
		}

		return restaurantOwner.toObject();
	}

	private throwNotFoundException() {
		throw new NotFoundException('Restaurant owner not found');
	}
}
