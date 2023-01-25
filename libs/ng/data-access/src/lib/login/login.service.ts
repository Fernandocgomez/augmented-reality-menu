import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ConfigService } from '@xreats/ng/shared';
import { ILoggedInRestaurantOwner } from '@xreats/shared-models';

@Injectable()
export class LoginService {    
    constructor(
        private readonly http: HttpClient,
        private readonly configService: ConfigService
    ) {}

    login(username: string, password: string) {
        return this.http.post<ILoggedInRestaurantOwner>(`${this.configService.XREATS_API_ENDPOINT}/auth/login`, {username, password});
    };
}