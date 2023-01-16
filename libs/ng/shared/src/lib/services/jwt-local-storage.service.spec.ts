import { JwtLocalStorageService } from './jwt-local-storage.service';

describe('JwtLocalStorageService', () => {
    let service: JwtLocalStorageService;

    const accessToken = 'access-token';

    beforeEach(() => {
        service = new JwtLocalStorageService();
        window.localStorage.clear();
    });

    describe('getAccessToken', () => {
        it('should return the access token', () => {
            window.localStorage.setItem('access_token', accessToken);

            expect(service.getAccessToken()).toEqual(accessToken);
        })
    });

    describe('removeAccessToken', () => {
        it('should remove the access token', () => {
            window.localStorage.setItem('access_token', accessToken);

            service.removeAccessToken();

            expect(window.localStorage.getItem('access_token')).toBeNull();
        });
    });

    describe('hasAccessToken', () => {
        it('should return true if the access token exists', () => {
            window.localStorage.setItem('access_token', accessToken);

            expect(service.hasAccessToken()).toBeTruthy();
        });

        it('should return false if the access token does not exist', () => {
            expect(service.hasAccessToken()).toBeFalsy();
        });
    });

    describe('setAccessToken', () => {
        it('should set the access token', () => {
            service.setAccessToken(accessToken);

            expect(window.localStorage.getItem('access_token')).toEqual(accessToken);
        });
    });
});