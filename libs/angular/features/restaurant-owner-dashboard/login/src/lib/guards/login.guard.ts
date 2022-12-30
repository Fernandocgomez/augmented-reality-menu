import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthFacade, AuthService } from '@xreats/data-access/auth';

import { TokenLocalStorageService } from '@xreats/angular/shared';
import { RestaurantOwnerInterface } from '@xreats/shared-models';

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly tokenLocalStorageService: TokenLocalStorageService,
		private readonly authFacade: AuthFacade
	) {}

	canActivate(): Observable<boolean> {
		const token = this.tokenLocalStorageService.getAccessToken();

		if (!token) {
			return of(true);
		}

		return this.authService.validateToken(token).pipe(
			map((validateTokenResponse) => {
				if (!validateTokenResponse.isTokenValid) {
					this.invalidTokenAction();

					return true;
				}

				this.validTokenAction(validateTokenResponse.restaurantOwner);

				return true;
			}),
			catchError(() => {
				this.invalidTokenAction();

				return of(true);
			})
		);
	}

	private invalidTokenAction(): void {
		this.tokenLocalStorageService.removeAccessToken();
		this.authFacade.dispatchUnauthenticatedRestaurantOwnerAction();
	}

	private validTokenAction(restaurantOwner: Partial<RestaurantOwnerInterface>): void {
		this.authFacade.dispatchAuthenticatedRestaurantOwnerAction(restaurantOwner);
		this.router.navigate(['/dashboard']);
	}
}
