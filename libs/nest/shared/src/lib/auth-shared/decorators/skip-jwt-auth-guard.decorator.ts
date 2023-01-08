import { SetMetadata } from '@nestjs/common';

const SKIP_JWT_AUTH_GUARD_KEY = 'isSkipJwtAuthGuardKey';

export const SkipJwtAuthGuard = () =>
  SetMetadata(SKIP_JWT_AUTH_GUARD_KEY, true);
