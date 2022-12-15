import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantOwnerDocument = RestaurantOwner & Document;

@Schema()
export class RestaurantOwner {
  @Prop()
  id: string;

  @Prop({
    unique: true,
  })
  username: string;

  @Prop()
  password: string;
}

export const RestaurantOwnerSchema = SchemaFactory.createForClass(RestaurantOwner);