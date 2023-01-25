import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "@xreats/ng/shared";
import { IValidateJwtResponse } from "@xreats/shared-models";

@Injectable()
export class AuthService {

    constructor(
        private readonly http: HttpClient,
        private readonly configService: ConfigService
    ) {}

    validateJwt(access_token: string) {
        return this.http.post<IValidateJwtResponse>(`${this.configService.XREATS_API_ENDPOINT}/auth/validate-token`, {access_token});
    }
}