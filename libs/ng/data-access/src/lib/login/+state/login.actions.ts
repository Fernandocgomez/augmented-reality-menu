import { createAction, props } from '@ngrx/store';

export interface LoginFailureResponse {
    statusCode: number;
    message: string[];
    error: string;
    path: string;
    method: string;
}

export interface LoginSuccessResponse {
    access_token: string;
    restaurantOwner: {
        _id: string;
        username: string;
    }
}

export const loginRequestStartAction = createAction(
    '[Login] Login Request Start',
    props<{ username: string; password: string }>()
);

export const loginRequestFailAction = createAction(
    '[Login] Login Request Fail',
    props<LoginFailureResponse>()
);

export const loginRequestSuccessAction = createAction(
    '[Login] Login Request Success',
    props<LoginSuccessResponse>()
);