import { createReducer, on, Action } from '@ngrx/store';

import { HttpExceptionResponseInterface, HttpRequestStateEnum } from '@xreats/shared-models';

import * as LoginActions from './login.actions';

export const LOGIN_FEATURE_KEY = 'login';

export interface LoginState {
  status: HttpRequestStateEnum;
  errorMessages: string[];
}

export const initialLoginState: LoginState = {
  status: HttpRequestStateEnum.INITIAL_STATE,
  errorMessages: [],
};

const loginRequestStartReducer = (
  state: LoginState,
): LoginState => {
  return {
    ...state,
    status: HttpRequestStateEnum.LOADING,
    errorMessages: []
  };
};

const loginRequestFailReducer = (
  state: LoginState,
  action: HttpExceptionResponseInterface
): LoginState => {
  return {
    ...state,
    status: HttpRequestStateEnum.FAILURE,
    errorMessages: action.message,
  };
};

const loginRequestSuccessReducer = (
  state: LoginState,
): LoginState => {
  return {
    ...state,
    status: HttpRequestStateEnum.SUCCESS,
    errorMessages: [],
  };
};

const reducer = createReducer(
  initialLoginState,
  on(LoginActions.loginRequestStartAction, loginRequestStartReducer),
  on(LoginActions.loginRequestFailAction, loginRequestFailReducer),
  on(LoginActions.loginRequestSuccessAction, loginRequestSuccessReducer),
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return reducer(state, action);
}
