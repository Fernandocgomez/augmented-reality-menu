import { IValidateJwtResponse } from './../interfaces/validate-jwt-response.interface';

export const invalidJwtResponseStub = (): IValidateJwtResponse => {
	return {
		statusCode: 401,
		message: ['Invalid token'],
		isTokenValid: false,
		restaurantOwner: null,
	};
};
