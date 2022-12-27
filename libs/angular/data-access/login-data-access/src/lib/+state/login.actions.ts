import { createAction, props } from '@ngrx/store';

export const loginRequestStartAction = createAction(
  '[Login Page] Login Request Start',
  props<{ username: string; password: string }>()
);

export const loginRequestFailAction = createAction(
  '[Login Page] Login Request Fail',
  props<{ statusCode: number; message: string[]; error: string }>()
);

export const loginRequestSuccessAction = createAction(
  '[Login Page] Login Request Success',
  props<{
    access_token: string;
    restaurantOwner: {
      id: string;
      username: string;
    };
  }>()
);
