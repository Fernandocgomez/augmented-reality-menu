import { ILoginFailureResponse } from "@xreats/shared-models";

export const LoginFailureResponseStub = (): ILoginFailureResponse  => {
    return {
        statusCode: 401,
        message: ['Unauthorized'],
        error: 'Unauthorized',
        path: '/api/v1/login',
        method: 'POST',
    };
}