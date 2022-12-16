import { Length, Matches } from 'class-validator';

import { RestaurantOwnerValidationErrorMessages } from '../enums/restaurant-owner-validation-error-messages.enum';

export class UpdateRestaurantOwnerDto {
    @Length(8, 20)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
        message: RestaurantOwnerValidationErrorMessages.password
    })
    password: string;
}