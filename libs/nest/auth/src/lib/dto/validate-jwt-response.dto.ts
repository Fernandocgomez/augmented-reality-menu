import { IRestaurantOwner, IValidateJwtResponse } from "@xreats/shared-models";

export class ValidateJwtResponseDto implements IValidateJwtResponse {
    statusCode: number;
    message: string[];
    isTokenValid: boolean;
    restaurantOwner: Partial<IRestaurantOwner>;

    constructor(data: Partial<ValidateJwtResponseDto>) {
        Object.assign(this, data);
    }
}