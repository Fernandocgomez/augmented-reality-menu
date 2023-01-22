import { ICreateRestaurantOwner } from "../interfaces";

export const CreateRestaurantOwnerDtoStub = (): ICreateRestaurantOwner => {
    return {
        username: 'username',
        password: 'IamAPassword%123',
    }
};