import { createReducer, on, Action } from '@ngrx/store';

export const AUTH_FEATURE_KEY = 'auth';

import { RestaurantOwnerInterface } from '@xreats/shared-models';

import * as AuthActions from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    restaurantOwner: Partial<RestaurantOwnerInterface> | null; 
}

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    restaurantOwner: null,
}

const authenticatedRestaurantOwnerReducer = (
    state: AuthState,
    action: { restaurantOwner: Partial<RestaurantOwnerInterface> },
) => {
    return {
        ...state,
        restaurantOwner: action.restaurantOwner,
        isAuthenticated: true,
    };
};

const unauthenticatedRestaurantOwnerReducer = (
    state: AuthState,
) => {
    return {
        ...state,
        restaurantOwner: null,
        isAuthenticated: false,
    };
}

const reducer = createReducer(
    initialAuthState,
    on(AuthActions.authenticatedRestaurantOwnerAction, authenticatedRestaurantOwnerReducer),
    on(AuthActions.unauthenticatedRestaurantOwnerAction, unauthenticatedRestaurantOwnerReducer),
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
};