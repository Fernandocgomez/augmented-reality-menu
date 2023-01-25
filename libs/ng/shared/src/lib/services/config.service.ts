import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';

interface Config {
	XREATS_API_ENDPOINT: string;
}

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	private configData?: Config;

    get XREATS_API_ENDPOINT() {
        return this.configData?.XREATS_API_ENDPOINT || '';
    }

	constructor(private readonly http: HttpClient) {}

	loadConfigData() {
		const response = lastValueFrom(this.http.get<Config>('assets/config.json'));

		return response.then((data) => {
			this.configData = data;
		})
        .catch(() => {
            throw new Error('Failed to load config.json');
        })
	}
}
