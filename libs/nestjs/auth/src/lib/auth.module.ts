import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './passport-strategies/local.strategy';
import { JwtStrategy } from './passport-strategies/jwt.strategy';

import { RestaurantOwnerModule } from '@xreats/nestjs-restaurant-owner';

@Module({
  imports: [
    PassportModule, 
    RestaurantOwnerModule, 
    JwtModule.register({
    secret: process.env.NX_JWT_SECRET,
    signOptions: {
      expiresIn: '7d'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})

export class AuthModule {}