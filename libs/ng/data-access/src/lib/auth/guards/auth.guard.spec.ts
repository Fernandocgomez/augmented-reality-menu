import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JwtLocalStorageService } from '@xreats/ng/shared';
import { of, throwError } from 'rxjs';

import { DataAccessAuthFacade } from '../+state/auth.facade';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
	let guard: AuthGuard;
	let router: Router;
	let dataAccessAuthFacade: DataAccessAuthFacade;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AuthGuard,
				JwtLocalStorageService,
				{
					provide: DataAccessAuthFacade,
					useValue: {
						validateJwt: jest.fn(),
					},
				},
				{
					provide: Router,
					useValue: {
						navigate: jest.fn(),
					},
				},
			],
		});

		guard = TestBed.inject(AuthGuard);
		router = TestBed.inject(Router);
		dataAccessAuthFacade = TestBed.inject(DataAccessAuthFacade);

		window.localStorage.clear();
	});

	describe('canActivate()', () => {
		describe('when token is no present in the local storage', () => {
			it('should return an Observable of type boolean equals to false', (done) => {
				window.localStorage.clear();

				guard.canActivate().subscribe((result) => {
					expect(result).toEqual(false);
					done();
				});
			});

            it('should redirect to the login page', (done) => {
                guard.canActivate().subscribe(() => {
                    expect(router.navigate).toHaveBeenCalledWith(['/login']);
                    done();
                });
            });
		});

		describe('when token is present in the local storage and it is valid', () => {
			it('should return an Observable of type boolean equals to true', (done) => {
				window.localStorage.setItem('access_token', 'valid_token');

				jest.spyOn(dataAccessAuthFacade, 'validateJwt').mockReturnValue(of(true));

				guard.canActivate().subscribe((result) => {
					expect(result).toEqual(true);
					done();
				});
			});
		});

		describe('when token is present in the local storage and it is not valid', () => {

            beforeEach(() => {
                window.localStorage.setItem('access_token', 'invalid_token');
				jest.spyOn(dataAccessAuthFacade, 'validateJwt').mockReturnValue(of(false));
            });

			it('should return an Observable of type boolean equals to false', (done) => {
				guard.canActivate().subscribe((result) => {
					expect(result).toEqual(false);
					done();
				});
			});

            it('should remove the token from the local storage', (done) => {
                guard.canActivate().subscribe(() => {
                    expect(window.localStorage.getItem('access_token')).toBeNull();
                    done();
                });
            });

            it('should navigate to the login page', (done) => {
                guard.canActivate().subscribe(() => {
                    expect(router.navigate).toHaveBeenCalledWith(['/login']);
                    done();
                });
            });
		});
        
        describe('when token is present in the local storage and the validateJwt method throws an exception', () => {
            it('should return an Observable of type boolean equals to false', (done) => {
                window.localStorage.setItem('access_token', 'invalid_token');
                jest.spyOn(dataAccessAuthFacade, 'validateJwt').mockImplementation(() => {
                    return throwError(() => new Error('Error'));
                });

                guard.canActivate().subscribe((result) => {
                    expect(result).toEqual(false);
                    done();
                });
            });
        });
	});
});
