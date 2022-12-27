import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOGIN_FEATURE_KEY, LoginState } from './login.reducer';

export const selectLoginState =
  createFeatureSelector<LoginState>(LOGIN_FEATURE_KEY);

export const selectLoginStatus = createSelector(
  selectLoginState,
  (state: LoginState) => state.status
);

export const selectErrorMessages = createSelector(
  selectLoginState,
  (state: LoginState) => state.errorMessages
);