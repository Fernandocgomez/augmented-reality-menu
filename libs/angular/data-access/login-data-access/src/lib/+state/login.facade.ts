import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LoginActions from './login.actions';
import * as LoginSelectors from './login.selectors';
import { map, Observable } from 'rxjs';
import { HttpRequestStateEnum } from '@xreats/shared-models';

@Injectable()
export class LoginFacade {
  private readonly store = inject(Store);

  dispatchLoginRequestStartAction(username: string, password: string): void {
    const action = LoginActions.loginRequestStartAction({ username, password });

    this.store.dispatch(action);
  }

  isLoginStatusRequestLoading(): Observable<boolean> {
    return this.store
      .select(LoginSelectors.selectLoginStatus)
      .pipe(map((loginStatus) => loginStatus === HttpRequestStateEnum.LOADING));
  }

  getLoginRequestErrorMessages(): Observable<string[]> {
    return this.store.select(LoginSelectors.selectErrorMessages);
  }
}
