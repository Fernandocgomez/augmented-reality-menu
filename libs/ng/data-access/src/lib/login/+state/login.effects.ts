import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, tap } from 'rxjs';

import { LoginService } from '../login.service';
import * as LoginActions from './login.actions';

@Injectable()
export class LoginEffects {
	private actions$ = inject(Actions);

	constructor(
		private readonly loginService: LoginService,
		private readonly router: Router,
	) {}

	loginRequestStart$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LoginActions.loginRequestStartAction),
			fetch({
				run: (action) => {
					const { username, password } = action;

					return this.loginService.login(username, password).pipe(
						map((loginResponse) => {
							return LoginActions.loginRequestSuccessAction(loginResponse);
						})
					);
				},
				onError: (_, error) => {
					const httpExceptionResponse: LoginActions.LoginFailureResponse = error.error;

					return LoginActions.loginRequestFailAction(httpExceptionResponse);
				},
			})
		)
	);

	loginRequestSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(LoginActions.loginRequestSuccessAction),
				tap((action) => {
					// this.tokenLocalStorageService.setAccessToken(action.access_token);
					// this.authFace.dispatchAuthenticatedRestaurantOwnerAction(action.restaurantOwner);
					this.router.navigate(['/dashboard']);
				})
			),
		{
			dispatch: false,
		}
	);
}
