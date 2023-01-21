import { IValidateJwtResponse } from "../interfaces";

export const validJwtResponseStub = (): IValidateJwtResponse => {
    return {
        statusCode: 201,
        message: ['Valid token'],
        isTokenValid: true,
        restaurantOwner: {
            _id: '63bb40866064288375f12c94',
            username: 'taqueria11',
        },
    };
};