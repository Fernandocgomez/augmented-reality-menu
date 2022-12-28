import { RestaurantOwnerInterface, RestaurantOwnerValidationErrorMessages } from '@xreats/shared-models';
import { Length, Matches } from 'class-validator';

export class UpdateRestaurantOwnerDto implements RestaurantOwnerInterface {
    id: string;

    username: string;

    @Length(8, 20)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
        message: RestaurantOwnerValidationErrorMessages.password
    })
    password: string;
}