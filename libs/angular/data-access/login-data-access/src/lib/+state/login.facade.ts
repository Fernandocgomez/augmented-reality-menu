import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as LoginActions from './login.actions';
import * as LoginFeature from './login.reducer';
import * as LoginSelectors from './login.selectors';
import { map, Observable } from 'rxjs';

@Injectable()
export class LoginFacade {
  private readonly store = inject(Store);

  dispatchLoginRequestStartAction(username: string, password: string): void {
    const action = LoginActions.loginRequestStartAction({ username, password });

    this.store.dispatch(action);
  }

  getLoginRequestSuccessAction() {
    return LoginActions.loginRequestSuccessAction;
  }

  isLoginStatusRequestLoading(): Observable<boolean> {
    return this.store
      .select(LoginSelectors.selectLoginStatus)
      .pipe(map((loginStatus) => loginStatus === 'LOADING'));
  }

  getLoginRequestErrorMessages(): Observable<string[]> {
    return this.store.select(LoginSelectors.selectErrorMessages);
  }
}
