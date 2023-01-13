import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { LoginFacadeService } from './../../services/login-facade.service';

@Component({
	selector: 'feature-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
	loginForm: FormGroup = new FormGroup({
		username: this.createUsernameControl(),
		password: this.createPasswordControl()
	});

	hidePassword$: Observable<boolean>;
	httpErrorMessages$: Observable<string[]>;
	disabledSubmitButton$: Observable<boolean>;
	showLoader$: Observable<boolean>;
	
	constructor(private readonly loginFacadeService: LoginFacadeService) {
		this.hidePassword$ = of(true);
		this.httpErrorMessages$ = of([]);
		this.disabledSubmitButton$ = of(false);
		this.showLoader$ = of(false);
	}

	onSubmit() {
		if (!this.loginForm.valid) {
			return;
		}

		const { username, password } = this.loginForm.value;

		this.loginFacadeService.dispatchLoginStartAction(username, password);
	};

	isUsernameControlValid() {
		return this.loginForm.get('username')?.valid;
	}

	isPasswordControlValid() {
		return this.loginForm.get('password')?.valid;
	}

	togglePasswordVisibility() {
		this.hidePassword$ = this.hidePassword$.pipe(
			map((hidePassword) => !hidePassword)
		);
	}

	private createUsernameControl() {
		return new FormControl('', [
			Validators.required,
			Validators.maxLength(16),
			Validators.minLength(5),
			Validators.pattern(/^[a-z0-9]*$/),
		]);
	}

	private createPasswordControl() {
		return new FormControl('', [
			Validators.required,
			Validators.maxLength(20),
			Validators.minLength(8),
		]);
	}
}
