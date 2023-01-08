import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RestaurantOwner extends Document {
  @Prop({
    unique: true,
    immutable: true
  })
  username: string;

  @Prop()
  password: string;
}

export const RestaurantOwnerSchema = SchemaFactory.createForClass(RestaurantOwner);