import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

const SKIP_JWT_AUTH_GUARD_KEY = 'isSkipJwtAuthGuardKey';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isSkipJwtAuthGuard = this.reflector.getAllAndOverride<boolean>(
      SKIP_JWT_AUTH_GUARD_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (isSkipJwtAuthGuard) {
      return true;
    }

    return super.canActivate(context);
  }
}
