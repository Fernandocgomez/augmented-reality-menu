import { createReducer, on, Action } from '@ngrx/store';

import * as LoginActions from './login.actions';

enum LoginStatus {
  INITIAL_STATE = 'INITIAL_STATE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE', 
}

export const LOGIN_FEATURE_KEY = 'login';

export interface LoginState {
  isAuthenticated: boolean;
  status: LoginStatus,
  errorMessage: string | null;
  restaurantOwner: '',
}

export const initialLoginState: LoginState = {
  isAuthenticated: false,
  status: LoginStatus.INITIAL_STATE,
  errorMessage: null,
  restaurantOwner: ''
};

const authUser = (state: LoginState): LoginState => {
  return {
    ...state,
    status: LoginStatus.LOADING,
  }
};

const authUserSuccess = (state: LoginState): LoginState => {
  return {
    ...state,
    status: LoginStatus.SUCCESS,
  }
};

const authUserFailure = (state: LoginState): LoginState => {
  return {
    ...state,
    status: LoginStatus.SUCCESS,
  }
};

const reducer = createReducer(
  initialLoginState,
  on(LoginActions.authUser, authUser),
  on(LoginActions.authUserSuccess, authUserSuccess),
  on(LoginActions.authUserFailure, authUserFailure)
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return reducer(state, action);
}
