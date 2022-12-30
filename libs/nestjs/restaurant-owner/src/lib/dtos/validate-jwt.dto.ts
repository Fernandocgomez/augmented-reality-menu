import { JsonWebTokenInterface } from "@xreats/shared-models";

export class ValidateJwtDto implements JsonWebTokenInterface {
    access_token: string;
}