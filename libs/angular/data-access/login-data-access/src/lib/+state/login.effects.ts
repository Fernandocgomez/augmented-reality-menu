import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LoginActions from './login.actions';
import * as LoginFeature from './login.reducer';
import { map, tap } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);

  constructor(private readonly loginService: LoginService, private router: Router) {}

  loginRequestStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginRequestStartAction),
      fetch({
        run: (action) => {
          const { username, password } = action;

          return this.loginService.login(username, password).pipe(
            map(() => {
              return LoginActions.loginRequestSuccessAction({
                access_token: '',
                restaurantOwner: { username: '', id: '' },
              });
            })
          );
        },
        onError: (action, error) => {
          return LoginActions.loginRequestFailAction({
            statusCode: error.statusCode,
            message: error.message,
            error: error.error,
          });
        },
      })
    )
  );

  loginRequestSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginRequestSuccessAction),
      tap(() => {
        this.router.navigate(['/dashboard'])
      })
    ),
    {
      dispatch: false,
    }
  );
}
