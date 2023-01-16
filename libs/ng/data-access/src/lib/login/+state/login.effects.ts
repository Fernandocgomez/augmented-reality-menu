import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../login.service';

import { fetch } from '@nrwl/angular';

import * as LoginActions from './login.actions';
import { map, tap } from 'rxjs';

@Injectable()
export class LoginEffects {
	private actions$ = inject(Actions);

	constructor(private readonly loginService: LoginService) {}

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
					const httpExceptionResponse: LoginActions.LoginFailureResponse = error;

					return LoginActions.loginRequestFailAction(httpExceptionResponse);
				},
			})
		)
	);
}
