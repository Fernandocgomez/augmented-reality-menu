import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataAccessAuthFacade } from '@xreats/ng/data-access';
import { JwtLocalStorageService } from '@xreats/ng/shared';
import { Observable, of, map, tap } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(
		private readonly router: Router,
		private readonly jwtLocalStorageService: JwtLocalStorageService,
		private readonly authFacade: DataAccessAuthFacade
	) {}

	canActivate(): Observable<boolean> {
		const token = this.jwtLocalStorageService.getAccessToken();

		if (!token) {
			return of(true);
		}

		return this.authFacade.validateJwt(token).pipe(
			map((isTokenValid) => {
				if (isTokenValid) {
					return false;
				}

				return true;
			}),
			tap((allowAccess) => {
				if (allowAccess) {
					this.jwtLocalStorageService.removeAccessToken();
				} else {
					this.router.navigate(['/dashboard']);
				}
			})
		);
	}
}
