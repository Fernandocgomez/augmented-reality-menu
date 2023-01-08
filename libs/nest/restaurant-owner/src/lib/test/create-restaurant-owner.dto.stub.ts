import { CreateRestaurantOwnerDto } from "@xreats/nest/shared";

export const CreateRestaurantOwnerDtoStub = (): CreateRestaurantOwnerDto => {
    return {
        username: 'username',
        password: 'IamAPassword%123',
    }
};