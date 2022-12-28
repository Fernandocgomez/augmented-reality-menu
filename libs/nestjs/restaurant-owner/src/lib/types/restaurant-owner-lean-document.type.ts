import { LeanDocument } from "mongoose";
import { RestaurantOwner } from "../schemas/restaurant-owner.schema";

export type RestaurantOwnerLeanDocumentType = LeanDocument<RestaurantOwner> & Required<{ _id: string; __v: number }>;