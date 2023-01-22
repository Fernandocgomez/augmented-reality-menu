import { createAction, props } from '@ngrx/store';
import { IRestaurantOwner } from '@xreats/shared-models';

export const authenticateRestaurantOwnerAction = createAction(
    '[Auth] Authenticate Restaurant Owner',
    props<{ restaurantOwner: Partial<IRestaurantOwner>}>()
);

export const unauthenticatedRestaurantOwnerAction = createAction(
    '[Auth] Unauthenticated Restaurant Owner'
);