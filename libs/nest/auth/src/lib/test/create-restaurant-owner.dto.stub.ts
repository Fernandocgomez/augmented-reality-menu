import { CreateRestaurantOwnerDto } from "../dto/create-restaurant-owner.dto";

export const CreateRestaurantOwnerDtoStub = (): CreateRestaurantOwnerDto => {
    return {
        username: 'username',
        password: 'IamAPassword%123',
    }
};