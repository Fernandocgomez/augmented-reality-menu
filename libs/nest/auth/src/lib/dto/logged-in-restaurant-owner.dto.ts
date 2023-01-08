import { RestaurantOwner } from '@xreats/nest/shared';

export class LoggedInRestaurantOwnerDto {
    access_token: string;
    restaurantOwner: Partial<RestaurantOwner>;

    constructor(data: Partial<LoggedInRestaurantOwnerDto>) {
        Object.assign(this, data);
    }
}