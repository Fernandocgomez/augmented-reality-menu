import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IValidateJwtResponse } from "@xreats/shared-models";

@Injectable()
export class AuthService {

    private readonly xreatsApi = 'http://localhost:3333/api/v1';

    constructor(private readonly http: HttpClient) {}

    validateJwt(access_token: string) {
        return this.http.post<IValidateJwtResponse>(`${this.xreatsApi}/auth/validate-token`, {access_token});
    }
}