import { createAction, props } from '@ngrx/store';

export const authUser = createAction('[Login Page] Auth User');

export const authUserSuccess = createAction('[Login Page] Auth Success');

export const authUserFailure = createAction('[Login Page] Auth Failure');