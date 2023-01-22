import { createAction, props } from '@ngrx/store';
import { ILoggedInRestaurantOwner, ILoginFailureResponse } from '@xreats/shared-models';

export const loginRequestStartAction = createAction(
    '[Login] Login Request Start',
    props<{ username: string; password: string }>()
);

export const loginRequestFailAction = createAction(
    '[Login] Login Request Fail',
    props<ILoginFailureResponse>()
);

export const loginRequestSuccessAction = createAction(
    '[Login] Login Request Success',
    props<ILoggedInRestaurantOwner>()
);