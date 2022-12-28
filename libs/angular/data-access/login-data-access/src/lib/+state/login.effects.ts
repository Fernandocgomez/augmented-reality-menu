import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { fetch } from '@nrwl/angular';

import * as LoginActions from './login.actions';

import { map, tap } from 'rxjs';

import { LoginService } from '../services/login.service';

import { HttpExceptionResponseInterface } from '@xreats/shared-models';

import { LocalStorageService } from '@xreats/angular/shared';

@Injectable()
export class LoginEffects {
	private actions$ = inject(Actions);

	constructor(
		private readonly loginService: LoginService,
		private readonly router: Router,
		private readonly localStorageService: LocalStorageService
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
				onError: (action, error) => {
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
					this.localStorageService.setItem('access_token', action.access_token);
					this.router.navigate(['/dashboard']);
				})
			),
		{
			dispatch: false,
		}
	);
}
