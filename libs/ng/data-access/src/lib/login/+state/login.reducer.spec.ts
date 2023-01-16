import { LoginFailureResponseStub } from '../testing/login-failure-response.stub';
import * as LoginActions from './login.actions';
import { initialLoginState, loginRequestFailReducer, loginRequestStartReducer, loginRequestSuccessReducer } from './login.reducer';

describe('loginRequestStartReducer()', () => {
	it('should set httpState to LOADING', () => {
		const result = loginRequestStartReducer(initialLoginState);

		expect(result.httpState).toEqual('LOADING');
	});
});

describe('loginRequestFailReducer()', () => {
	it('should set httpState to FAILURE', () => {
		const action = LoginActions.loginRequestFailAction(LoginFailureResponseStub());
		const result = loginRequestFailReducer(initialLoginState, action);

		expect(result.httpState).toEqual('FAILURE');
	});

	it('should set httpErrorMessages to ["Unauthorized"]', () => {
		const action = LoginActions.loginRequestFailAction(LoginFailureResponseStub());
		const result = loginRequestFailReducer(initialLoginState, action);

		expect(result.httpErrorMessages).toEqual(LoginFailureResponseStub().message);
	});
});

describe('loginRequestSuccessReducer()', () => {
	it('should set httpState to SUCCESS', () => {
        const result = loginRequestSuccessReducer(initialLoginState);

        expect(result.httpState).toEqual('SUCCESS');
	});

    it('should set httpErrorMessages to []', () => {
        const result = loginRequestSuccessReducer(initialLoginState);

        expect(result.httpErrorMessages).toEqual([]);
    })
});
