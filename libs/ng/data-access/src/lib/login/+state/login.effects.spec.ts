// https://dev.to/jdpearce/how-to-test-five-common-ngrx-effect-patterns-26cb
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions, EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';

import { LoginService } from '../login.service';
import { LoginFailureResponseStub } from './../testing/login-failure-response.stub';
import { LoginSuccessResponseStub } from './../testing/login-success-response.stub';
import * as LoginActions from './login.actions';
import { LoginEffects } from './login.effects';
import { initialLoginState, LoginState } from './login.reducer';

describe('LoginEffects', () => {
	let actions$: Actions;

	let loginEffect: LoginEffects;
	let metadata: EffectsMetadata<LoginEffects>;

	let store: MockStore<LoginState>;
	let loginService: LoginService;
	let router: Router;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				LoginEffects,
				LoginService,
				provideMockActions(() => actions$),
				provideMockStore({ initialState: initialLoginState }),
			],
		});

		loginEffect = TestBed.inject(LoginEffects);
		loginService = TestBed.inject(LoginService);
		router = TestBed.inject(Router);
		metadata = getEffectsMetadata(loginEffect);
		store = TestBed.inject(MockStore) as MockStore<LoginState>;
	});

	describe('loginRequestStart$', () => {
		const username = 'username';
		const password = 'password';

		it('should emit Login Request Success action when the service call is successful', () => {
			jest.spyOn(loginService, 'login').mockReturnValue(of(LoginSuccessResponseStub()));
			const action = LoginActions.loginRequestStartAction({ username, password });

			actions$ = hot('a', { a: action });

			expect(loginEffect.loginRequestStart$).toBeObservable(
				cold('a', { a: LoginActions.loginRequestSuccessAction(LoginSuccessResponseStub()) })
			);
		});

		it('should emit Login Request Fail action when the service call is unsuccessful', () => {
			jest
				.spyOn(loginService, 'login')
				.mockReturnValue(throwError(() => LoginFailureResponseStub()));
			const action = LoginActions.loginRequestStartAction({ username, password });

			actions$ = hot('a', { a: action });

			expect(loginEffect.loginRequestStart$).toBeObservable(
				cold('a', { a: LoginActions.loginRequestFailAction(LoginFailureResponseStub()) })
			);
		});
	});

	describe('loginRequestSuccess$', () => {
		it('should not return any action', () => {
			expect(metadata.loginRequestSuccess$).toEqual(
				expect.objectContaining({
					dispatch: false,
				})
			);
		});

		it('should navigate to the dashboard', () => {
			jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));
			const action = LoginActions.loginRequestSuccessAction(LoginSuccessResponseStub());

			actions$ = hot('a', { a: action });

			expect(loginEffect.loginRequestSuccess$).toBeObservable(
				cold('a', { a: LoginActions.loginRequestSuccessAction(LoginSuccessResponseStub()) })
			);
			expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
		});

		// it('should set the JWT in the local storage', () => {
		// 	null;
		// });

		// it('should dispatch the AuthenticatedRestaurantOwnerAction', () => {
		// 	null;
		// });
	});
});
