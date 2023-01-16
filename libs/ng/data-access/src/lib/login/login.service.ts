import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

interface LoggedInRestaurantOwner {
    access_token: string;
    restaurantOwner: { _id: string; username: string; };
}

@Injectable()
export class LoginService {
    private readonly xreatsApi = 'http://localhost:3333/api/v1';
    
    constructor(private readonly http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<LoggedInRestaurantOwner>(`${this.xreatsApi}/auth/login`, {username, password});
    };
}