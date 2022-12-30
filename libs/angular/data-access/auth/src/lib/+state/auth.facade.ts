import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AuthActions from "./auth.actions";
import { RestaurantOwnerInterface } from '@xreats/shared-models';

@Injectable()
export class AuthFacade {
    private readonly store = inject(Store);

    dispatchAuthenticatedRestaurantOwnerAction(
        restaurantOwner: Partial<RestaurantOwnerInterface>
    ): void {
        const action = AuthActions.authenticatedRestaurantOwnerAction({ restaurantOwner });

        this.store.dispatch(action);
    };

    dispatchUnauthenticatedRestaurantOwnerAction(): void {
        const action = AuthActions.unauthenticatedRestaurantOwnerAction();

        this.store.dispatch(action);
    };
}