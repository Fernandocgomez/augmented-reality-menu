import { createReducer, on, Action } from '@ngrx/store';

import * as LoginActions from './login.actions';

type LoginStatus = '' | 'LOADING' | 'SUCCESS' | 'FAILURE';

export const LOGIN_FEATURE_KEY = 'login';

export interface LoginState {
  status: LoginStatus;
  errorMessages: string[];
}

export const initialLoginState: LoginState = {
  status: '',
  errorMessages: [],
};

const loginRequestStartReducer = (
  state: LoginState,
): LoginState => {
  return {
    ...state,
    status: 'LOADING',
    errorMessages: []
  };
};

const loginRequestFailReducer = (
  state: LoginState,
  action: { statusCode: number, message: string[], error: string }
): LoginState => {
  return {
    ...state,
    status: 'FAILURE',
    errorMessages: action.message,
  };
};

const loginRequestSuccessReducer = (
  state: LoginState,
): LoginState => {
  return {
    ...state,
    status: 'SUCCESS',
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
