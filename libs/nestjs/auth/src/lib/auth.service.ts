import { Inject, Injectable } from '@nestjs/common';
import { BcryptService } from '@xreats/nestjs-bcrypt';


interface RestaurantUser {
    id: string;
    username: string;
    password: string;
}

interface RestaurantUserService {
    findRestaurantOwnerByUsername(username: string): RestaurantUser;
}

@Injectable()
export class AuthService {

    constructor(
        private readonly bcryptService: BcryptService, 
        @Inject('RestaurantUserService') private readonly restaurantUserService: RestaurantUserService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.restaurantUserService.findRestaurantOwnerByUsername(username);
        const passwordMatch = this.bcryptService.compare(password, user.password);

        if(passwordMatch) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }
}
