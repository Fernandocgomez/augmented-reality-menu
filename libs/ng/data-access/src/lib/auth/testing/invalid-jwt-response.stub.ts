export const invalidJwtResponseStub = () => {
	return {
		statusCode: 401,
		message: ['Invalid token'],
		isTokenValid: false,
		restaurantOwner: null,
	};
};
