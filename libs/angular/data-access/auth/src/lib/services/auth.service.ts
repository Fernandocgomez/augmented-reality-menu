import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ValidateTokenResponseInterface } from '@xreats/shared-models';

@Injectable()
export class AuthService {
	private xreatsBackendEndPoint = 'http://localhost:3333/api/';

	constructor(
        private readonly http: HttpClient,
    ) {}

	validateToken(token: string): Observable<ValidateTokenResponseInterface> {
		return this.http
			.post<ValidateTokenResponseInterface>(`${this.xreatsBackendEndPoint}auth/validate-token`, {
				access_token: token
			});
	}
}
