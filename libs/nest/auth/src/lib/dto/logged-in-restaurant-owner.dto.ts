import { ILoggedInRestaurantOwner, IRestaurantOwner } from '@xreats/shared-models';

export class LoggedInRestaurantOwnerDto implements ILoggedInRestaurantOwner {
    access_token: string;
    restaurantOwner: Partial<IRestaurantOwner>;

    constructor(data: Partial<LoggedInRestaurantOwnerDto>) {
        Object.assign(this, data);
    }
}