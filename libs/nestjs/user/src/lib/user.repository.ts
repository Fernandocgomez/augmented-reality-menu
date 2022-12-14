import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);

    return newUser.save().catch((e) => {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Username '${e.errors.username.value}' is already taken.`,
        },
        HttpStatus.BAD_REQUEST,
        { cause: new Error(e) }
      );
    });
  }
}
