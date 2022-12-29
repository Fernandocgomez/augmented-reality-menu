import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable()
export class LoginFormFactoryService {

  constructor(private fb: FormBuilder) { }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: this.getUsernameControl(),
      password: this.getPasswordControl(),
    });
  }

  private getUsernameControl(): FormControl {
    return this.fb.control('', [
      Validators.required, 
      Validators.maxLength(16), 
      Validators.minLength(5), 
      Validators.pattern(/^[a-z0-9]*$/)
    ])
  }

  private getPasswordControl(): FormControl {
    return this.fb.control('', [
      Validators.required, 
      Validators.maxLength(20),
      Validators.minLength(8),
    ])
  }
}
