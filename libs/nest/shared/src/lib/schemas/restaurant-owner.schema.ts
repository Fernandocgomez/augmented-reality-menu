import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IRestaurantOwner } from '@xreats/shared-models';

@Schema()
export class RestaurantOwner extends Document implements IRestaurantOwner {
	_id!: string;
	
	@Prop({
		unique: true,
		immutable: true,
	})
	username!: string;

	@Prop()
	password!: string;
}

export const RestaurantOwnerSchema = SchemaFactory.createForClass(RestaurantOwner);