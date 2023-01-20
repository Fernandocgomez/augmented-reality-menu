import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of, tap } from 'rxjs';

import { AuthService, ValidateJwtResponse } from './../auth.service';
import { authenticateRestaurantOwnerAction, unauthenticatedRestaurantOwnerAction } from './auth.actions';

@Injectable()
export class DataAccessAuthFacade {
	private readonly store = inject(Store);

	constructor(private authService: AuthService) {}

	authenticatedRestaurantOwnerAction(restaurantOwner: { _id: string; username: string }) {
		this.store.dispatch(authenticateRestaurantOwnerAction({ restaurantOwner }));
	}

	dispatchUnauthenticatedRestaurantOwnerAction() {
		this.store.dispatch(unauthenticatedRestaurantOwnerAction());
	}

    validateJwt(access_token: string) {
        return this.authService.validateJwt(access_token)
            .pipe(
                tap((response) => {
                    this.handelValidateJwtResponseSideEffects(response);
                }),
                map((response) => {
                    return response.isTokenValid;
                }),
                catchError(() => {
                    this.dispatchUnauthenticatedRestaurantOwnerAction();
                    return of(false);
                })
            );
    }

    private handelValidateJwtResponseSideEffects(response: ValidateJwtResponse) {
        if (response.isTokenValid && response.restaurantOwner) {
            this.authenticatedRestaurantOwnerAction(response.restaurantOwner);
        } else {
            this.dispatchUnauthenticatedRestaurantOwnerAction();
        }
    }
}
