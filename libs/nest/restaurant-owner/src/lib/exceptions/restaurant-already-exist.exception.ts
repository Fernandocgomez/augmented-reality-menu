import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantOwnerAlreadyExistException extends HttpException {
    constructor(username: string) {
        super(
            `Restaurant owner with username ${username} already exists`
            ,HttpStatus.BAD_REQUEST
        );
    }
}