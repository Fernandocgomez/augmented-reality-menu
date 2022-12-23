import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as LoginActions from './login.actions';
import * as LoginFeature from './login.reducer';
import * as LoginSelectors from './login.selectors';

@Injectable()
export class LoginFacade {
  private readonly store = inject(Store);

  dispatchAuthUserAction(): void {
    const action = LoginActions.authUser();

    this.store.dispatch(action);
  }
}
