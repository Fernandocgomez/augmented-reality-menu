import { createAction, props } from '@ngrx/store';
import { RestaurantOwnerInterface } from '@xreats/shared-models';

export const authenticatedRestaurantOwnerAction = createAction(
    '[Login] Authenticated Restaurant Owner',
    props<{ restaurantOwner: Partial<RestaurantOwnerInterface> }>()
);

export const unauthenticatedRestaurantOwnerAction = createAction(
    '[Login] Unauthenticated Restaurant Owner',
);