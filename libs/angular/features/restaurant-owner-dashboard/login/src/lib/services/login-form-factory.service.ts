import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class LoginFormFactoryService {

  constructor(private fb: FormBuilder) { }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control('', [
        Validators.required, 
        Validators.maxLength(16), 
        Validators.minLength(5), 
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]),
      password: this.fb.control('', [
        Validators.required, 
        Validators.maxLength(20),
        Validators.minLength(8),
      ]),
    });
  }
}
