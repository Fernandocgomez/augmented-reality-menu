import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(username: string, password: string): Promise<User> {
        return this.userRepository.create({
            userId: uuidv4(),
            username,
            password
        });
    }
}
