import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

const HttpClientMock = {
    provide: HttpClient,
    useValue: {
        get: jest.fn().mockReturnValue(
            of({
                XREATS_API_ENDPOINT: 'http://localhost:3333/api/v1',
            })
        ),
    },
}

describe('Name of the group', () => {
	let service: ConfigService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				ConfigService,
				HttpClientMock
			],
		});

		service = TestBed.inject(ConfigService);
	});

	describe('XREATS_API_ENDPOINT()', () => {
        it('should return the XREATS_API_ENDPOINT value on the JSON file retrieved from the server', async () => {
            await service.loadConfigData();

            const result = service.XREATS_API_ENDPOINT;

            expect(result).toBe('http://localhost:3333/api/v1');
        });
    });

    describe('loadConfigData()', () => {
        it('should return a promise', () => {
            const result = service.loadConfigData();

            expect(result).toBeInstanceOf(Promise);
        })
    })
});
