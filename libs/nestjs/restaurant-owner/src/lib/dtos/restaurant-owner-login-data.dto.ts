import { RestaurantOwnerInterface, RestaurantOwnerLoginInterface } from "@xreats/shared-models";

export class RestaurantOwnerLoginDataDto implements RestaurantOwnerLoginInterface {
    access_token: string;
    restaurantOwner: Partial<RestaurantOwnerInterface>;
}