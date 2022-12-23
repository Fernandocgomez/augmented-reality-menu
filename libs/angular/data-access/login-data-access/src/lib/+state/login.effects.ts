import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LoginActions from './login.actions';
import * as LoginFeature from './login.reducer';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);

  authUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.authUser),
      fetch({
        run: (action) => {
          return LoginActions.authUserSuccess();
        },
        onError: (action, error) => {
          return LoginActions.authUserFailure();
        },
      })
    )
  );
}
