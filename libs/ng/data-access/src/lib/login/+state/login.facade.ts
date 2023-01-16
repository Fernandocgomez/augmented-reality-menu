import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LoginActions from './login.actions';
import * as LoginSelectors from './login.selectors';
import { map } from 'rxjs';

@Injectable()
export class LoginFacade {
  private readonly store = inject(Store);

  dispatchLoginRequestStartAction(username: string, password: string) {
    this.store.dispatch(LoginActions.loginRequestStartAction({username, password}));
  };

  isHttpStateLoading() {
    return this.store.select(LoginSelectors.selectHttpState).pipe(
      map((httpState) => httpState === 'LOADING')
    );
  };

  getHttpErrorMessages() {
    return this.store.select(LoginSelectors.selectHttpErrorMessages);
  };
}
