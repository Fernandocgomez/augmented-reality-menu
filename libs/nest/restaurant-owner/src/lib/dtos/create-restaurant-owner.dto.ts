import { Length, Matches } from 'class-validator';

export class CreateRestaurantOwnerDto {
  @Length(5, 16)
  @Matches(/^[a-z0-9]*$/, {
    message: 'Username must be lowercase and alphanumeric',
  })
  username: string;

  @Length(8, 20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(!@#$%^&*)',
  })
  password: string;
}
