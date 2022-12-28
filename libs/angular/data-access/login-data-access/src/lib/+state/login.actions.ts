import { createAction, props } from '@ngrx/store';
import { HttpExceptionResponseInterface, RestaurantOwnerLoginInterface } from '@xreats/shared-models';

export const loginRequestStartAction = createAction(
  '[Login Page] Login Request Start',
  props<{ username: string; password: string }>()
);

export const loginRequestFailAction = createAction(
  '[Login Page] Login Request Fail',
  props<HttpExceptionResponseInterface>()
);

export const loginRequestSuccessAction = createAction(
  '[Login Page] Login Request Success',
  props<RestaurantOwnerLoginInterface>()
);
