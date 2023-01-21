import { Action, createReducer, on } from '@ngrx/store';

import { authenticateRestaurantOwnerAction, unauthenticatedRestaurantOwnerAction } from './auth.actions';
import { IRestaurantOwner } from '@xreats/shared-models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
    isAuthenticated: boolean;
    restaurantOwner: Partial<IRestaurantOwner> | null;
}

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    restaurantOwner: null,
}

export const authenticateRestaurantOwnerReducer = (state: AuthState, actions: { restaurantOwner: Partial<IRestaurantOwner> }): AuthState => {
    return {
        ...state,
        isAuthenticated: true,
        restaurantOwner: actions.restaurantOwner,
    };
};

export const unauthenticatedRestaurantOwnerReducer = (state: AuthState): AuthState => {
    return {
        ...state,
        isAuthenticated: false,
        restaurantOwner: null,
    };
};

const reducer = createReducer(
    initialAuthState,
    on(authenticateRestaurantOwnerAction, authenticateRestaurantOwnerReducer),
    on(unauthenticatedRestaurantOwnerAction, unauthenticatedRestaurantOwnerReducer)
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
};