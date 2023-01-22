import { IJsonWebToken } from "@xreats/shared-models";

export class JwtDto implements IJsonWebToken {
    access_token: string;
}