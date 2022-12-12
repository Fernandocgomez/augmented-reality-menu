import { Length, Matches } from 'class-validator';

export class CreateUserDto {
    @Length(5, 16)
    @Matches(/^[a-z0-9]+$/, { message: 'Username can only be composed of lowercase letters and numbers' })
    username: string;

    @Length(8, 20)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, { message: 'Password should include at least one uppercase letter, one lowercase letter, one number, and one special character(!@#$%^&*)' })
    password: string;
}