import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport-strategies/local.strategy';

@Module({
  controllers: [],
  providers: [AuthService, LocalStrategy],
  imports: [PassportModule]
})
export class AuthModule {}
