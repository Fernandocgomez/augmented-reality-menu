import { IRestaurantOwner } from "../../restaurant-owner";

export interface IValidateJwtResponse {
    statusCode: number;
    message: string[];
    isTokenValid: boolean;
    restaurantOwner: Partial<IRestaurantOwner> | null;
}