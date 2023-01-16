import {
	authenticateRestaurantOwnerReducer,
	initialAuthState,
	unauthenticatedRestaurantOwnerReducer,
} from './auth.reducer';
import { restaurantOwnerStub } from './../testing/restaurant-owner.stub';

describe('authenticateRestaurantOwnerReducer', () => {
	it('should set isAuthenticated to true', () => {
		const result = authenticateRestaurantOwnerReducer(initialAuthState, {
			restaurantOwner: restaurantOwnerStub(),
		});

		expect(result.isAuthenticated).toEqual(true);
	});

    it('should set restaurantOwner to the value being passed as an action', () => {
        const result = authenticateRestaurantOwnerReducer(initialAuthState, {
            restaurantOwner: restaurantOwnerStub(),
        });

        expect(result.restaurantOwner).toEqual(restaurantOwnerStub());
    });
});

describe('unauthenticatedRestaurantOwnerReducer()', () => {
	it('should set isAuthenticated to false', () => {
		const result = unauthenticatedRestaurantOwnerReducer(initialAuthState);

		expect(result.isAuthenticated).toEqual(false);
	});

    it('should set restaurantOwner to null', () => {
        const result = unauthenticatedRestaurantOwnerReducer(initialAuthState);

        expect(result.restaurantOwner).toEqual(null);
    })
});