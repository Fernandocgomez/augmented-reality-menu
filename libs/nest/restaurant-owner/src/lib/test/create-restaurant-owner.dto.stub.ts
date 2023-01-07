import { CreateRestaurantOwnerDto } from "../dtos/create-restaurant-owner.dto";


export const CreateRestaurantOwnerDtoStub = (): CreateRestaurantOwnerDto => {
    return {
        username: 'username',
        password: 'IamAPassword%123',
    }
};