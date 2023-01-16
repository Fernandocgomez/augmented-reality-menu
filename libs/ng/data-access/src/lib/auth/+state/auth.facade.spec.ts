import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';

import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import { DataAccessAuthFacade } from './auth.facade';
import { AUTH_FEATURE_KEY, authReducer, AuthState, initialAuthState } from './auth.reducer';
import { restaurantOwnerStub } from './../testing/restaurant-owner.stub';

import { validJwtResponseStub } from './../testing/valid-jwt-response.stub';
import { invalidJwtResponseStub } from './../testing/invalid-jwt-response.stub';

describe('DataAccessAuthFacade', () => {
	let facade: DataAccessAuthFacade;
	let store: Store<AuthState>;
	let authService: AuthService;

	beforeEach(() => {
		@NgModule({
			imports: [
				HttpClientTestingModule,
				StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, { initialState: initialAuthState }),
				EffectsModule.forFeature([]),
			],
			providers: [DataAccessAuthFacade, AuthService],
		})
		class FeatureModule {}

		@NgModule({
			imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), FeatureModule],
		})
		class RootModule {}

		TestBed.configureTestingModule({ imports: [RootModule] });

		facade = TestBed.inject(DataAccessAuthFacade);
		store = TestBed.inject(Store) as MockStore<AuthState>;
		authService = TestBed.inject(AuthService);
	});

	describe('dispatchAuthenticateUser()', () => {
		it('should dispatch authenticateRestaurantOwnerAction', () => {
			
			const action = AuthActions.authenticateRestaurantOwnerAction({ restaurantOwner: restaurantOwnerStub() });

			jest.spyOn(store, 'dispatch');

			facade.dispatchAuthenticateUser(restaurantOwnerStub());

			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe('dispatchUnauthenticatedRestaurantOwnerAction()', () => {
		it('should dispatch unauthenticatedRestaurantOwnerAction', () => {
			const action = AuthActions.unauthenticatedRestaurantOwnerAction();

			jest.spyOn(store, 'dispatch');

			facade.dispatchUnauthenticatedRestaurantOwnerAction();

			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe('validateJwt()', () => {
		it('should dispatch authenticateRestaurantOwnerAction if token is valid', (done) => {
            const action = AuthActions.authenticateRestaurantOwnerAction({ restaurantOwner: validJwtResponseStub().restaurantOwner })
			jest.spyOn(authService, 'validateJwt').mockImplementation(() => {
				return of(validJwtResponseStub());
			});
            jest.spyOn(store, 'dispatch');

            facade.validateJwt('validJwt').subscribe(() => {
                expect(store.dispatch).toHaveBeenCalledWith(action);
                done();
            });
		});

		it('should return true if token is valid', (done) => {
            jest.spyOn(authService, 'validateJwt').mockImplementation(() => {
				return of(validJwtResponseStub());
			});

            facade.validateJwt('validJwt').subscribe((isTokenValid) => {
                expect(isTokenValid).toBe(true);
                done();
            });
		});

        it('should dispatch unauthenticatedRestaurantOwnerAction if token is invalid', (done) => {
			const action = AuthActions.unauthenticatedRestaurantOwnerAction();

			jest.spyOn(authService, 'validateJwt').mockImplementation(() => {
				return of(invalidJwtResponseStub());
			});
			jest.spyOn(store, 'dispatch');

			facade.validateJwt('invalidJwt').subscribe(() => {
				expect(store.dispatch).toHaveBeenCalledWith(action);
				done();
			});
        });

		it('should return false if token is invalid', (done) => {
			jest.spyOn(authService, 'validateJwt').mockImplementation(() => {
				return of(invalidJwtResponseStub());
			});

			facade.validateJwt('invalidJwt').subscribe((isTokenValid) => {
				expect(isTokenValid).toBe(false);
				done();
			});
		});

		it('should dispatch unauthenticatedRestaurantOwnerAction if an exception is thrown', (done) => {
			const action = AuthActions.unauthenticatedRestaurantOwnerAction();

			jest.spyOn(authService, 'validateJwt').mockImplementation(() => {
				return throwError(() => new Error('Error'));
			});
			jest.spyOn(store, 'dispatch');

			facade.validateJwt('invalidJwt').subscribe(() => {
				expect(store.dispatch).toHaveBeenCalledWith(action);
				done();
			});
		});

		it('should return false if an exception is thrown', (done) => {
			jest.spyOn(authService, 'validateJwt').mockImplementation(() => {
				return throwError(() => new Error('Error'));
			});

			facade.validateJwt('invalidJwt').subscribe((isTokenValid) => {
				expect(isTokenValid).toBe(false);
				done();
			});
		});
	});
});
