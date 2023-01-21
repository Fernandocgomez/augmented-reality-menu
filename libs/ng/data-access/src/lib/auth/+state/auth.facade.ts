import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IValidateJwtResponse, IRestaurantOwner } from '@xreats/shared-models';
import { catchError, map, of, tap } from 'rxjs';

import { AuthService } from './../auth.service';
import { authenticateRestaurantOwnerAction, unauthenticatedRestaurantOwnerAction } from './auth.actions';

@Injectable()
export class DataAccessAuthFacade {
	private readonly store = inject(Store);

	constructor(private authService: AuthService) {}

	authenticatedRestaurantOwnerAction(restaurantOwner: Partial<IRestaurantOwner>) {
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

    private handelValidateJwtResponseSideEffects(response: IValidateJwtResponse) {
        if (response.isTokenValid && response.restaurantOwner) {
            this.authenticatedRestaurantOwnerAction(response.restaurantOwner);
        } else {
            this.dispatchUnauthenticatedRestaurantOwnerAction();
        }
    }
}
