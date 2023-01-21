import { IRestaurantOwner } from "../../restaurant-owner";
import { IJsonWebToken } from "./json-web-token.interface";

export interface ILoggedInRestaurantOwner extends IJsonWebToken {
    restaurantOwner: Partial<IRestaurantOwner>;
}