import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RestaurantOwnerAccessControlGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const restaurantOwner = request.user;
    
    return params.id === restaurantOwner.id;
  }
}