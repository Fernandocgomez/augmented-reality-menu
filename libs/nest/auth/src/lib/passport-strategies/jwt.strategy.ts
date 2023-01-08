import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        process.env.NX_JWT_SECRET
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.NX_JWT_SECRET,
            ignoreExpiration: false,
        })
    }

    async validate(payload: { username: string, sub: string }) {
        return {
            id: payload.sub,
            username: payload.username
        }
    }
}