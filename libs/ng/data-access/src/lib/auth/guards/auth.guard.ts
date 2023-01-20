import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtLocalStorageService } from '@xreats/ng/shared';
import { catchError, map, Observable, of, tap } from "rxjs";

import { DataAccessAuthFacade } from './../+state/auth.facade';

@Injectable() 
export class AuthGuard implements CanActivate {
    constructor(
        private dataAccessAuthFacade: DataAccessAuthFacade,
        private jwtLocalStorageService: JwtLocalStorageService,
        private router: Router,
    ) {}

    canActivate(): Observable<boolean> {
        const token = this.jwtLocalStorageService.getAccessToken();

        if (!token) {
            this.router.navigate(['/login']);

			return of(false);
		}

        return this.dataAccessAuthFacade.validateJwt(token).pipe(
            tap((isTokenValid) => {
                this.handleSideEffects(isTokenValid);
            }),
            map((isTokenValid) => {
                return isTokenValid; 
            }),
            catchError(() => {
                return of(false);
            }),
        );
    }

    private handleSideEffects(isTokenValid: boolean) {
        if(!isTokenValid) {
            this.jwtLocalStorageService.removeAccessToken();
            this.router.navigate(['/login']);
        }
    }
}