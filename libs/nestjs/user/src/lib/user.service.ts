import { Injectable } from '@nestjs/common';

import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

import { v4 as uuidv4 } from 'uuid';
import { BcryptService } from '@xreats/nestjs-bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await this.bcryptService.hash(password);

    return this.userRepository.createUser({
      userId: uuidv4(),
      username,
      password: hashedPassword,
    });
  }
}
