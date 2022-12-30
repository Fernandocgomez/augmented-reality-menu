import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { fetch } from '@nrwl/angular';

import * as LoginActions from './login.actions';

import { map, tap } from 'rxjs';

import { LoginService } from '../services/login.service';

import { HttpExceptionResponseInterface } from '@xreats/shared-models';

import { TokenLocalStorageService } from '@xreats/angular/shared';

import { AuthFacade } from '@xreats/data-access/auth';

@Injectable()
export class LoginEffects {
	private actions$ = inject(Actions);

	constructor(
		private readonly loginService: LoginService,
		private readonly router: Router,
		private readonly tokenLocalStorageService: TokenLocalStorageService,
		private readonly authFace: AuthFacade,
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
					const httpExceptionResponse: HttpExceptionResponseInterface = error.error;

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
					this.tokenLocalStorageService.setAccessToken(action.access_token);
					this.authFace.dispatchAuthenticatedRestaurantOwnerAction(action.restaurantOwner);
					this.router.navigate(['/dashboard']);
				})
			),
		{
			dispatch: false,
		}
	);
}
