import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LOGIN_FEATURE_KEY, LoginState } from './login.reducer';

export const selectLoginState =
  createFeatureSelector<LoginState>(LOGIN_FEATURE_KEY);

export const selectHttpState = createSelector(
  selectLoginState,
  (state: LoginState) => state.httpState,
);

export const selectHttpErrorMessages = createSelector(
  selectLoginState,
  (state: LoginState) => state.httpErrorMessages,
);