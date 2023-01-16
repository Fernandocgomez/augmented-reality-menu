import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import * as LoginActions from './login.actions';
import * as LoginSelectors from './login.selectors';

@Injectable()
export class DataAccessLoginFacade {
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
