import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { LoginFormFactoryService } from './../../services/login-form-factory.service';

@Component({
  selector: 'feature-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  hidePassword = true;
  loginForm: FormGroup;
  showLoader: Observable<boolean> = of(false);
  disabledSubmitButton: Observable<boolean> = of(false);

  constructor(loginFormFactoryService: LoginFormFactoryService) {
    this.loginForm = loginFormFactoryService.createLoginForm();
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.showLoader = of(true);
    this.disabledSubmitButton = of(true);
  }

  isUsernameControlValid() {
    return this.loginForm.get('username')?.valid;
  }
}
