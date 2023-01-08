import { SetMetadata } from '@nestjs/common';

export const SKIP_JWT_AUTH_GUARD_KEY = 'isSkipJwtAuthGuardKey';

export const SkipJwtAuthGuard = () =>
  SetMetadata(SKIP_JWT_AUTH_GUARD_KEY, true);
