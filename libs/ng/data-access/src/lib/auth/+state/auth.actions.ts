import { createAction, props } from '@ngrx/store';

export const authenticateRestaurantOwnerAction = createAction(
    '[Auth] Authenticate Restaurant Owner',
    props<{ restaurantOwner: { _id: string; username: string } }>()
);

export const unauthenticatedRestaurantOwnerAction = createAction(
    '[Auth] Unauthenticated Restaurant Owner'
);