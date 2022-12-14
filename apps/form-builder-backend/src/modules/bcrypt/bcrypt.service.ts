import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    
    async hash(rawValue: string): Promise<string> {
        const SALT = bcrypt.genSaltSync();

        return bcrypt.hash(rawValue, SALT);
    };

    async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compareSync(rawPassword, hashedPassword);
    }
}
