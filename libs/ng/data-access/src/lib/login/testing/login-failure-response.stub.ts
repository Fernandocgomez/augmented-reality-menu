export const LoginFailureResponseStub = () => {
    return {
        statusCode: 401,
        message: ['Unauthorized'],
        error: 'Unauthorized',
        path: '/api/v1/login',
        method: 'POST',
    };
}