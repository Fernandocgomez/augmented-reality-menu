import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { BcryptService } from '@xreats/nestjs-bcrypt';

import { UpdateRestaurantOwnerDto } from '../dtos/update-restaurant-owner.dto';

import { RestaurantOwnerRepository } from '../repositories/restaurant-owner.repository';
import { PartialRestaurantOwnerType } from '../types/partial-restaurant-owner.type';

import { RestaurantOwnerLeanDocumentType } from '../types/restaurant-owner-lean-document.type';

import { RestaurantOwnerTransformerUtility } from '../utilities/restaurant-owner-transformer.utility';

@Injectable()
export class RestaurantOwnerService {
	private restaurantOwnerTransformer = new RestaurantOwnerTransformerUtility();

	constructor(
		private readonly restaurantOwnerRepository: RestaurantOwnerRepository,
		private readonly bcryptService: BcryptService
	) {}

	async createRestaurantOwner(
		username: string,
		password: string
	): Promise<PartialRestaurantOwnerType> {
		const hashedPassword = await this.hashPassword(password);

		const restaurantOwner = await this.restaurantOwnerRepository.createRestaurantOwner({
			id: uuidv4(),
			username,
			password: hashedPassword,
		});

		return await this.restaurantOwnerTransformer.removeSensitiveProperties(restaurantOwner);
	}

	async findRestaurantOwnerById(id: string): Promise<PartialRestaurantOwnerType> {
		const restaurantOwner = await this.restaurantOwnerRepository.findRestaurantOwnerById(id);

		return await this.restaurantOwnerTransformer.removeSensitiveProperties(restaurantOwner);
	}

	async findRestaurantOwnerByUsername(username: string): Promise<RestaurantOwnerLeanDocumentType> {
		const restaurantOwner = await this.restaurantOwnerRepository.findRestaurantOwnerByUsername(
			username
		);

		return await restaurantOwner;
	}

	async updateRestaurantOwner(
		restaurantOwnerId: string,
		updateRestaurantOwnerDto: UpdateRestaurantOwnerDto
	): Promise<PartialRestaurantOwnerType> {
		let updateRestaurantOwnerDtoCopy = { ...updateRestaurantOwnerDto };

		if (updateRestaurantOwnerDtoCopy?.password) {
			const hashedPassword = await this.hashPassword(updateRestaurantOwnerDtoCopy.password);

			updateRestaurantOwnerDtoCopy = {
				...updateRestaurantOwnerDtoCopy,
				password: hashedPassword,
			};
		}

		const updatedRestaurantOwner = await this.restaurantOwnerRepository.updateRestaurantOwnerById(
			{ id: restaurantOwnerId },
			updateRestaurantOwnerDtoCopy
		);

		return await this.restaurantOwnerTransformer.removeSensitiveProperties(updatedRestaurantOwner);
	}

	async deleteRestaurantOwner(id: string): Promise<PartialRestaurantOwnerType> {
		const deletedRestaurantOwner = await this.restaurantOwnerRepository.deleteRestaurantOwnerById(
			id
		);

		return await this.restaurantOwnerTransformer.removeSensitiveProperties(deletedRestaurantOwner);
	}

	async compareRawPasswordWithHashedPassword(
		rawPassword: string,
		hashedPassword: string
	): Promise<boolean> {
		return this.bcryptService.compare(rawPassword, hashedPassword);
	}

	private async hashPassword(password: string): Promise<string> {
		return await this.bcryptService.hash(password);
	}
}
