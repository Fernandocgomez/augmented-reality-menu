import { RestaurantOwner } from "../schemas/restaurant-owner.schema";

export class RestaurantOwnerTransformerUtility {
    removeSensitiveProperties(
        restaurantOwner: Partial<RestaurantOwner>
    ): Partial<RestaurantOwner> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, __v, ...rest } = restaurantOwner;

		return rest;
    }
}