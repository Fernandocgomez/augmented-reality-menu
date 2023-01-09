import { RestaurantOwner } from "@xreats/nest/shared";

export class ValidateJwtResponseDto {
    statusCode: number;
    message: string[];
    isTokenValid: boolean;
    restaurantOwner: Partial<RestaurantOwner>;

    constructor(data: Partial<ValidateJwtResponseDto>) {
        Object.assign(this, data);
    }
}