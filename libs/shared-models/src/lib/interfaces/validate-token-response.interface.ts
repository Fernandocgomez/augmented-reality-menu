import { RestaurantOwnerInterface } from './restaurant-owner.interface';

export interface ValidateTokenResponseInterface {
    statusCode: number;
    message: string[];
    isTokenValid: boolean;
    restaurantOwner: Partial<RestaurantOwnerInterface>;
}