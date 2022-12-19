import { SetMetadata } from '@nestjs/common';

import { SKIP_JWT_AUTH_GUARD_KEY } from './keys/skip-jwt-auth-guard.key';

export const SkipJwtAuthGuard = () => SetMetadata(SKIP_JWT_AUTH_GUARD_KEY, true);