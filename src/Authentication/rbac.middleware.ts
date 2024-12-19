import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

interface JwtUser {
  fullName: string;
  role: string;
}

/*@Injectable()
export class RbacMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const currentUser = req.user as JwtUser; // Expect only the necessary fields
    const fullName = currentUser?.fullName;
    const userRole = currentUser?.role;

    if (!fullName || !userRole) {
      // Log and throw exception if user information is incomplete
      this.loggingService.logUnauthorizedAccess(req.originalUrl, 'unknown', req.ip);
      throw new ForbiddenException('Access Denied: User information is incomplete.');
    }

    const requiredRole = this.getRequiredRoleForRoute(req.originalUrl);

    if (userRole !== requiredRole) {
      this.loggingService.logUnauthorizedAccess(req.originalUrl, fullName, req.ip);
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
}
*/