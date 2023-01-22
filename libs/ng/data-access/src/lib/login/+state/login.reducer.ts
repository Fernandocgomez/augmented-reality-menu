import { Action, createReducer, on } from '@ngrx/store';
import { ILoginFailureResponse } from '@xreats/shared-models';

import * as LoginActions from './login.actions';

export const LOGIN_FEATURE_KEY = 'login';

export interface LoginState {
	httpState: 'INITIAL_STATE' | 'LOADING' | 'SUCCESS' | 'FAILURE';
	httpErrorMessages: string[];
}

export const initialLoginState: LoginState = {
	httpState: 'INITIAL_STATE',
	httpErrorMessages: [],
};

export const loginRequestStartReducer = (
	state: LoginState,
): LoginState => {
	return {
		...state,
		httpState: 'LOADING',
	};
};

export const loginRequestFailReducer = (
  state: LoginState,
  action: ILoginFailureResponse,
): LoginState => {
  return {
    ...state,
    httpState: 'FAILURE',
    httpErrorMessages: action.message,
  };
};

export const loginRequestSuccessReducer = (
  state: LoginState,
): LoginState => {
  return {
    ...state,
    httpState: 'SUCCESS',
    httpErrorMessages: [],
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
