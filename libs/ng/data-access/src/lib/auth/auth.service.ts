import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface ValidateJwtResponse {
    statusCode: number;
    message: string[];
    isTokenValid: boolean;
    restaurantOwner: {
        _id: string;
        username: string;
    } | null;
}

@Injectable()
export class AuthService {

    private readonly xreatsApi = 'http://localhost:3333/api/v1';

    constructor(private readonly http: HttpClient) {}

    validateJwt(access_token: string) {
        return this.http.post<ValidateJwtResponse>(`${this.xreatsApi}/auth/validate-token`, {access_token});
    }
}