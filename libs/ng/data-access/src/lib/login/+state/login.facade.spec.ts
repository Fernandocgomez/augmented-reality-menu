import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { DataAccessAuthFacade } from '../../auth/+state/auth.facade';

import { LoginService } from '../login.service';
import { LoginFailureResponseStub } from './../testing/login-failure-response.stub';
import * as LoginActions from './login.actions';
import { LoginEffects } from './login.effects';
import { DataAccessLoginFacade } from './login.facade';
import { initialLoginState, LOGIN_FEATURE_KEY, loginReducer, LoginState } from './login.reducer';
import * as LoginSelectors from './login.selectors';

describe('DataAccessLoginFacade', () => {
	let facade: DataAccessLoginFacade;
	let store: Store<LoginState>;

	const username = 'username';
	const password = 'password';

	beforeEach(() => {
		@NgModule({
			imports: [
				HttpClientTestingModule,
				StoreModule.forFeature(LOGIN_FEATURE_KEY, loginReducer, {
					initialState: initialLoginState,
				}),
				EffectsModule.forFeature([LoginEffects]),
			],
			providers: [
				DataAccessLoginFacade,
				LoginService,
				{
					provide: DataAccessAuthFacade,
					useValue: {
						authenticatedRestaurantOwnerAction: jest.fn(),
					},
				},
			],
		})
		class FeatureModule {}

		@NgModule({
			imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), FeatureModule],
		})
		class RootModule {}

		TestBed.configureTestingModule({ imports: [RootModule] });

		facade = TestBed.inject(DataAccessLoginFacade);
		store = TestBed.inject(Store) as MockStore<LoginState>;
	});

	describe('loginRequestStartAction()', () => {
		it('should dispatch loginRequestStartAction', () => {
			const action = LoginActions.loginRequestStartAction({ username, password });

			jest.spyOn(store, 'dispatch');

			facade.dispatchLoginRequestStartAction(username, password);

			expect(store.dispatch).toHaveBeenCalledWith(action);
		});

		it('should set the httpState to "LOADING"', (done) => {
			facade.dispatchLoginRequestStartAction(username, password);

			store.select(LoginSelectors.selectHttpState).subscribe((httpState) => {
				expect(httpState).toEqual('LOADING');
				done();
			});
		});
	});

	describe('isHttpStateLoading()', () => {
		it('should return an observable of type boolean', (done) => {
			facade.isHttpStateLoading().subscribe((isHttpStateLoading) => {
				expect(typeof isHttpStateLoading).toEqual('boolean');
				done();
			});
		});

		it('should emit true when the httpState is equal to "LOADING"', (done) => {
			store.dispatch(LoginActions.loginRequestStartAction({ username, password }));

			facade.isHttpStateLoading().subscribe((isHttpStateLoading) => {
				expect(isHttpStateLoading).toEqual(true);
				done();
			});
		});

		it('should emit false when the httpState is not "LOADING"', (done) => {
			facade.isHttpStateLoading().subscribe((isHttpStateLoading) => {
				expect(isHttpStateLoading).toEqual(false);
				done();
			});
		});
	});

	describe('getHttpErrorMessages()', () => {
		it('should return an observable of type string[]', (done) => {
			facade.getHttpErrorMessages().subscribe((httpErrorMessages) => {
				expect(Array.isArray(httpErrorMessages)).toEqual(true);
				done();
			});
		});

		it('should return an array of error messages when the httpState is "FAILURE"', (done) => {
			store.dispatch(LoginActions.loginRequestFailAction(LoginFailureResponseStub()));

			facade.getHttpErrorMessages().subscribe((httpErrorMessages) => {
				expect(httpErrorMessages).toEqual(LoginFailureResponseStub().message);
				done();
			});
		});

		it('should return an empty array when the httpState is not "FAILURE"', (done) => {
			facade.getHttpErrorMessages().subscribe((httpErrorMessages) => {
				expect(httpErrorMessages).toEqual([]);
				done();
			});
		});
	});
});
