import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantOwnerDocument = RestaurantOwner & Document;

@Schema()
export class RestaurantOwner {
  @Prop({
    unique: true,
    immutable: true
  })
  id: string;

  @Prop({
    unique: true,
    immutable: true
  })
  username: string;

  @Prop()
  password: string;
}

export const RestaurantOwnerSchema = SchemaFactory.createForClass(RestaurantOwner);