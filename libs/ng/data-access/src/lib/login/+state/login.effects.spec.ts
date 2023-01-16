// https://dev.to/jdpearce/how-to-test-five-common-ngrx-effect-patterns-26cb
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions, EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { JwtLocalStorageService } from '@xreats/ng/shared';
import { cold, hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { DataAccessAuthFacade } from '../../auth/+state/auth.facade';

import { LoginService } from '../login.service';
import { LoginFailureResponseStub } from './../testing/login-failure-response.stub';
import { LoginSuccessResponseStub } from './../testing/login-success-response.stub';
import * as LoginActions from './login.actions';
import { LoginEffects } from './login.effects';
import { initialLoginState } from './login.reducer';

describe('LoginEffects', () => {
	let actions$: Actions;

	let loginEffect: LoginEffects;
	let metadata: EffectsMetadata<LoginEffects>;

	let loginService: LoginService;
	let router: Router;
	let jwtLocalStorageService: JwtLocalStorageService;
	let authFace: DataAccessAuthFacade;

	const username = 'username';
	const password = 'password';

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				LoginEffects,
				LoginService,
				JwtLocalStorageService,
				{
					provide: DataAccessAuthFacade,
					useValue: {
						authenticatedRestaurantOwnerAction: jest.fn(),
						dispatchUnauthenticatedRestaurantOwnerAction: jest.fn(),
						validateJwt: jest.fn(),
					}
				},
				provideMockActions(() => actions$),
				provideMockStore({ initialState: initialLoginState }),
			],
		});

		jwtLocalStorageService = TestBed.inject(JwtLocalStorageService);
		loginEffect = TestBed.inject(LoginEffects);
		loginService = TestBed.inject(LoginService);
		router = TestBed.inject(Router);
		metadata = getEffectsMetadata(loginEffect);
		authFace = TestBed.inject(DataAccessAuthFacade);

		window.localStorage.clear();
	});

	describe('loginRequestStart$', () => {
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
				.mockReturnValue(throwError(() => {
					return {error: LoginFailureResponseStub()};
				}));
			const action = LoginActions.loginRequestStartAction({ username, password });

			actions$ = hot('a', { a: action });

			expect(loginEffect.loginRequestStart$).toBeObservable(
				cold('a', { a: LoginActions.loginRequestFailAction(LoginFailureResponseStub()) })
			);
		});
	});

	describe('loginRequestSuccess$', () => {

		beforeEach(() => {
			jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));
			jest.spyOn(jwtLocalStorageService, 'setAccessToken').mockImplementation(() => {
				window.localStorage.setItem('access_token', LoginSuccessResponseStub().access_token);
				return;
			});

			const action = LoginActions.loginRequestSuccessAction(LoginSuccessResponseStub());

			actions$ = hot('a', { a: action });
		});

		it('should not return any action', () => {
			expect(metadata.loginRequestSuccess$).toEqual(
				expect.objectContaining({
					dispatch: false,
				})
			);
		});

		it('should navigate to the dashboard page', () => {
			expect(loginEffect.loginRequestSuccess$).toBeObservable(
				cold('a', { a: LoginActions.loginRequestSuccessAction(LoginSuccessResponseStub()) })
			);
			expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
		});

		it('should set the JWT in the local storage', () => {
			expect(loginEffect.loginRequestSuccess$).toBeObservable(
				cold('a', { a: LoginActions.loginRequestSuccessAction(LoginSuccessResponseStub()) })
			);
			
			expect(jwtLocalStorageService.getAccessToken()).toEqual(LoginSuccessResponseStub().access_token);
		});

		it('should dispatch an AuthenticatedRestaurantOwnerAction', () => {
			jest.spyOn(authFace, 'authenticatedRestaurantOwnerAction').mockImplementation();

			expect(loginEffect.loginRequestSuccess$).toBeObservable(
				cold('a', { a: LoginActions.loginRequestSuccessAction(LoginSuccessResponseStub()) })
			);
			expect(authFace.authenticatedRestaurantOwnerAction).toHaveBeenCalled();
			expect(authFace.authenticatedRestaurantOwnerAction).toHaveBeenCalledWith(LoginSuccessResponseStub().restaurantOwner);
		});
	});
});
