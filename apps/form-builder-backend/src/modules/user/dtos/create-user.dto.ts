import { Length } from 'class-validator';

export class CreateUserDto {
    @Length(5, 16)
    username: string;

    @Length(8, 20)
    password: string;
}