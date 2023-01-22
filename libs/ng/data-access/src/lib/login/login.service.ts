import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ILoggedInRestaurantOwner } from '@xreats/shared-models';

@Injectable()
export class LoginService {
    private readonly xreatsApi = 'http://localhost:3333/api/v1';
    
    constructor(private readonly http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<ILoggedInRestaurantOwner>(`${this.xreatsApi}/auth/login`, {username, password});
    };
}