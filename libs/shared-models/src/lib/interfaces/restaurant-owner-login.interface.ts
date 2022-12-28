import { RestaurantOwnerInterface } from "./restaurant-owner.interface";

export interface RestaurantOwnerLoginInterface {
    access_token: string;
    restaurantOwner: Partial<RestaurantOwnerInterface>;
}