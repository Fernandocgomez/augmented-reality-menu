import { CreateRestaurantOwnerDtoStub } from '../stubs';
import { RestaurantOwnerTransformerUtility } from './restaurant-owner-transformer.utility';

describe('RestaurantOwnerTransformerUtility', () => {
    const restaurantOwnerTransformerUtility = new RestaurantOwnerTransformerUtility();
    const restaurantOwner = CreateRestaurantOwnerDtoStub();

    it('should return RestaurantOwner without the password property', () => {
        const result = restaurantOwnerTransformerUtility.removeSensitiveProperties(restaurantOwner);

        expect(result).not.toHaveProperty('password');
    });

    it('should return RestaurantOwner without the __v property', () => {
        const result = restaurantOwnerTransformerUtility.removeSensitiveProperties(restaurantOwner);

        expect(result).not.toHaveProperty('__v');
    });
});