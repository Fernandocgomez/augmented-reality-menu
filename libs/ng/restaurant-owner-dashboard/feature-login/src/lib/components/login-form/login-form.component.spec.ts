import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataAccessLoginFacade } from '@xreats/ng/data-access';
import { UiAlertModule, UiMaterialModule } from '@xreats/ui';
import { of } from 'rxjs';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
	let component: LoginFormComponent;
	let fixture: ComponentFixture<LoginFormComponent>;
	let loginFacadeService: DataAccessLoginFacade;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginFormComponent],
			imports: [
				UiMaterialModule, 
				NoopAnimationsModule,
				FormsModule, 
				ReactiveFormsModule,
				UiAlertModule
			],
			providers: [
				{
					provide: DataAccessLoginFacade,
					useValue: {
						dispatchLoginRequestStartAction: jest.fn(),
						getHttpErrorMessages: jest.fn().mockReturnValue(of([])),
						isHttpStateLoading: jest.fn().mockReturnValue(of(false)),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginFormComponent);
		component = fixture.componentInstance;
		loginFacadeService = TestBed.inject(DataAccessLoginFacade);

		fixture.detectChanges();
	});

	describe('UI', () => {
		it('should render a form with 2 inputs and a button', () => {
			const compiled = fixture.nativeElement;

			expect(compiled.querySelector('form')).toBeTruthy();
			expect(compiled.querySelectorAll('input').length).toBe(2);
			expect(compiled.querySelector('button')).toBeTruthy();
		});

		it('should have an input with the directive formControlName equals to "username"', () => {
			const compiled = fixture.nativeElement;

			expect(compiled.querySelector('input[formControlName="username"]')).toBeTruthy();
		});

		it('should have an input with the directive formControlName equals to "password"', () => {
			const compiled = fixture.nativeElement;

			expect(compiled.querySelector('input[formControlName="password"]')).toBeTruthy();
		});

		it('should invoke onSubmit method when the form is submitted', fakeAsync(() => {
			const onSubmitSpy = jest.spyOn(component, 'onSubmit');
			const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

			button.click();
			tick();

			expect(onSubmitSpy).toHaveBeenCalled();
		}));

		it('should display an error message under the username input when form is submitted and is invalid', fakeAsync(() => {
			const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

			button.click();
			tick();

			fixture.detectChanges();

			const errorMessage = fixture.debugElement.nativeElement.querySelector(
				'[data-test="username-error-message"]'
			);

			expect(errorMessage).toBeTruthy();
		}));

		it('should display an error message under the password input when form is submitted and is invalid', fakeAsync(() => {
			const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

			button.click();
			tick();
			fixture.detectChanges();

			const errorMessage = fixture.debugElement.nativeElement.querySelector(
				'[data-test="password-error-message"]'
			);

			expect(errorMessage).toBeTruthy();
		}));

		it('should toggle the password visibility when the eye icon is clicked', fakeAsync(() => {
			const eyeIcon = fixture.debugElement.nativeElement.querySelector('[data-test="eye-icon"]');
			const passwordInput = fixture.debugElement.nativeElement.querySelector(
				'input[formControlName="password"]'
			);

			expect(passwordInput.type).toBe('password');

			eyeIcon.click();
			tick();

			fixture.detectChanges();

			expect(passwordInput.type).toBe('text');

			eyeIcon.click();
			tick();

			fixture.detectChanges();

			expect(passwordInput.type).toBe('password');
		}));

		it('should display the ui-danger-alert component when there is http error messages', () => {
			const compiled = fixture.nativeElement;

			component.httpErrorMessages$ = of(['Error message']);
			fixture.detectChanges();

			expect(compiled.querySelector('ui-danger-alert')).toBeTruthy();
		});

		it('should disable the submit button when the disabledSubmitButton$ property emits true', () => {
			const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

			component.disabledSubmitButton$ = of(true);
			fixture.detectChanges();

			expect(button.disabled).toBeTruthy();
		});

		it('should display a progress bar when the showLoader$ property emits true', () => {
			const compiled = fixture.nativeElement;

			component.showLoader$ = of(true);
			fixture.detectChanges();

			expect(compiled.querySelector('mat-progress-bar')).toBeTruthy();
		});
	});

	describe('loginForm', () => {
		it('should have two FormControls', () => {
			expect(Object.keys(component.loginForm.controls).length).toBe(2);
		});

		describe('username FormControl', () => {
			it('should has a default value of empty string', () => {
				const username = component.loginForm.get('username');

				expect(username?.value).toBe('');
			});

			it('should be invalid if empty', () => {
				const username = component.loginForm.get('username');

				username?.setValue('');

				expect(username?.valid).toBeFalsy();
			});

			it('should be invalid when text length is grater than 16 characters', () => {
				const username = component.loginForm.get('username');

				username?.setValue('12345678901234567');

				expect(username?.valid).toBeFalsy();
			});

			it('should be invalid when the text length is less than 5 characters', () => {
				const username = component.loginForm.get('username');

				username?.setValue('1234');

				expect(username?.valid).toBeFalsy();
			});

			it('should be invalid when the text is composed of none lowercase alphanumerical characters', () => {
				const username = component.loginForm.get('username');

				username?.setValue('1234A');

				expect(username?.valid).toBeFalsy();
			});
		});

		describe('password FormControl', () => {
			it('should has a default value of empty string', () => {
				const password = component.loginForm.get('password');

				expect(password?.value).toBe('');
			});

			it('should be invalid if empty', () => {
				const password = component.loginForm.get('password');

				password?.setValue('');

				expect(password?.valid).toBeFalsy();
			});

			it('should be invalid when text length is grater than 20 characters', () => {
				const password = component.loginForm.get('password');

				password?.setValue('123456789012345678901');

				expect(password?.valid).toBeFalsy();
			});

			it('should be invalid when the text length is less than 8 characters', () => {
				const password = component.loginForm.get('password');

				password?.setValue('1234567');

				expect(password?.valid).toBeFalsy();
			});
		});
	});

	describe('onSubmit()', () => {
		it('should dispatch an ngrx action when the form is valid', () => {
			const username = component.loginForm.get('username');
			const password = component.loginForm.get('password');

			username?.setValue('username');
			password?.setValue('password');

			component.onSubmit();

			expect(loginFacadeService.dispatchLoginRequestStartAction).toHaveBeenCalledWith(
				'username',
				'password'
			);
			expect(loginFacadeService.dispatchLoginRequestStartAction).toHaveBeenCalledTimes(1);
		});
	});

	describe('isUsernameControlValid()', () => {
		it('should return true if the username control is valid', () => {
			const username = component.loginForm.get('username');

			username?.setValue('username');

			expect(component.isUsernameControlValid()).toBeTruthy();
		});

		it('should return false if the username control is invalid', () => {
			const username = component.loginForm.get('username');

			username?.setValue('');

			expect(component.isUsernameControlValid()).toBeFalsy();
		});
	});

	describe('isPasswordControlValid()', () => {
		it('should return true if the password control is valid', () => {
			const password = component.loginForm.get('password');

			password?.setValue('password');

			expect(component.isPasswordControlValid()).toBeTruthy();
		});

		it('should return false if the password control is invalid', () => {
			const password = component.loginForm.get('password');

			password?.setValue('');

			expect(component.isPasswordControlValid()).toBeFalsy();
		});
	});
});
