import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { LoginFormFactoryService } from './../../services/login-form-factory.service';
import { LoginFacade } from '@xreats/login-access-data';

@Component({
  selector: 'feature-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  hidePassword = true;
  loginForm: FormGroup;
  showLoader$: Observable<boolean>;
  disabledSubmitButton$: Observable<boolean>;
  errorMessages$: Observable<string[]>;

  constructor(
    readonly loginFormFactoryService: LoginFormFactoryService, 
    private readonly loginFacade: LoginFacade
  ) {
    this.loginForm = loginFormFactoryService.createLoginForm();
    this.showLoader$ = this.loginFacade.isLoginStatusRequestLoading();
    this.disabledSubmitButton$ = this.loginFacade.isLoginStatusRequestLoading();
    this.errorMessages$ = this.loginFacade.getLoginRequestErrorMessages();
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.loginFacade.dispatchLoginRequestStartAction(username, password);
  }

  isUsernameControlValid() {
    return this.loginForm.get('username')?.valid;
  }

  isPasswordControlValid() {
    return this.loginForm.get('password')?.valid;
  }
}
