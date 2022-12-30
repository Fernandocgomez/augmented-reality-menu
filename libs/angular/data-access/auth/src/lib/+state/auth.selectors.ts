import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, AUTH_FEATURE_KEY } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);

export const selectRestaurantOwner = createSelector(
    selectAuthState,
    (state: AuthState) => state.restaurantOwner
);