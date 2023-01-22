import { IRestaurantOwner } from "../interfaces";

export class RestaurantOwnerTransformerUtility {
    removeSensitiveProperties(
        restaurantOwner: Partial<IRestaurantOwner & Required<{ __v: number }>>
    ): Partial<IRestaurantOwner> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, __v, ...rest } = restaurantOwner;

		return rest;
    }
}