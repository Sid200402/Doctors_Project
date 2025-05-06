import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();

    
    if (!request.user) {
      
      throw new ForbiddenException('User not authenticated');
    }

    if (!request.user.roles) {
      throw new ForbiddenException('User roles not assigned');
    }
    const hasRole = requiredRoles.some(role => request.user.roles.includes(role));
    if (!hasRole) {
    
      throw new ForbiddenException('User does not have required permissions');
    }
    return true;
  }
}