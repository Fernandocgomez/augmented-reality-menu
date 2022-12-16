import { Length, Matches } from 'class-validator';

import { RestaurantOwnerValidationErrorMessages } from '../enums/restaurant-owner-validation-error-messages.enum';

export class CreateRestaurantOwnerDto {
  @Length(5, 16)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: RestaurantOwnerValidationErrorMessages.username,
  })
  username: string;

  @Length(8, 20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: RestaurantOwnerValidationErrorMessages.password,
  })
  password: string;
}
