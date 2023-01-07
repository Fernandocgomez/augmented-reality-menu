import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantOwnerNotFoundException extends HttpException {
    constructor() {
        super(
            'Restaurant owner not found'
            ,HttpStatus.NOT_FOUND
        );
    }
}