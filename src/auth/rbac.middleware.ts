/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service'; 
import { User } from '../users/user.schema'; 

@Injectable()
export class RbacMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user as User; 
    const userName = user?.name;

    if (!userName) {
      // If the user name is not found, log the unauthorized access attempt
      this.loggingService.logUnauthorizedAccess(req.originalUrl, 'unknown', req.ip);
      throw new ForbiddenException('Access Denied: User name not found.');
    }
    const requiredRole = this.getRequiredRoleForRoute(req.originalUrl);

    // Check if the user has access to the route
    if (!this.hasAccessToRoute(userName, requiredRole)) {
      this.loggingService.logUnauthorizedAccess(req.originalUrl, userName, req.ip);
      throw new ForbiddenException('Access Denied: Insufficient Permissions.');
    }

    next();
  }


  private getRequiredRoleForRoute(route: string): string {
    if (route.includes('admin')) {
      return 'admin';
    }
    return 'user'; 
  }

  // Check if a user has access to a route based on their role
  private hasAccessToRoute(userName: string, requiredRole: string): boolean {
    const userRoles = this.getUserRoles(userName);
    return userRoles.includes(requiredRole);
  }


  private getUserRoles(userName: string): string[] {
    const rolesMapping = {
      admin: ['admin'],
      instructor: ['instructor'],
      student: ['student'],
    };

    return rolesMapping[userName] || []; // Return empty if no roles are found
  }
}
