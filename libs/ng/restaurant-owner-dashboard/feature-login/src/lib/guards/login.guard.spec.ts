import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginGuard } from './login.guard';
import { JwtLocalStorageService } from '@xreats/ng/shared';
import { DataAccessAuthFacade } from '@xreats/ng/data-access';
import { of } from 'rxjs';

describe('LoginGuard', () => {
	let guard: LoginGuard;
	let router: Router;
	let authFacade: DataAccessAuthFacade;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LoginGuard,
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

		guard = TestBed.inject(LoginGuard);
		router = TestBed.inject(Router);
		authFacade = TestBed.inject(DataAccessAuthFacade);

		window.localStorage.clear();
	});

	describe('canActivate()', () => {
		describe('when token is no present in the local storage', () => {
			it('should return an Observable of type boolean equals to true', (done) => {
				window.localStorage.clear();

				guard.canActivate().subscribe((result) => {
					expect(result).toEqual(true);
					done();
				});
			});
		});

		describe('when token is present in the local storage and  it is valid', () => {
			it('should return an Observable of type boolean equals to false', (done) => {
				window.localStorage.setItem('access_token', 'valid_token');

				jest.spyOn(authFacade, 'validateJwt').mockReturnValue(of(true));

				guard.canActivate().subscribe((result) => {
					expect(result).toEqual(false);
					done();
				});
			});

			it('should navigate to the dashboard', (done) => {
				window.localStorage.setItem('access_token', 'valid_token');

				jest.spyOn(authFacade, 'validateJwt').mockReturnValue(of(true));
				jest.spyOn(router, 'navigate');

				guard.canActivate().subscribe(() => {
					expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
					done();
				});
			});
		});

		describe('when token is present in the local storage and it is invalid', () => {
			it('should return an Observable of type boolean equals to true', (done) => {
				window.localStorage.setItem('access_token', 'invalid_token');

				jest.spyOn(authFacade, 'validateJwt').mockReturnValue(of(false));

				guard.canActivate().subscribe((result) => {
					expect(result).toEqual(true);
					done();
				});
			});

			it('should remove the token from the local storage', (done) => {
				window.localStorage.setItem('access_token', 'invalid_token');

				jest.spyOn(authFacade, 'validateJwt').mockReturnValue(of(false));

				guard.canActivate().subscribe(() => {
					expect(window.localStorage.getItem('access_token')).toBeNull();
					done();
				});
			});
		});
	});
});
