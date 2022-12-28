import { PartialRestaurantOwnerType } from "../types/partial-restaurant-owner.type";
import { RestaurantOwnerLeanDocumentType } from "../types/restaurant-owner-lean-document.type";

export class RestaurantOwnerTransformerUtility {
    async removeSensitiveProperties(
        restaurantOwner: RestaurantOwnerLeanDocumentType
    ): Promise<PartialRestaurantOwnerType> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, _id, __v, ...rest } = await restaurantOwner;

		return await rest;
    }
}