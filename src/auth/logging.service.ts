/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggingService {
  private readonly logger: winston.Logger;

  constructor() {
    // Create the logger instance
    this.logger = winston.createLogger({
      level: 'info', // Default logging level
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        // File transport for rotating logs
        new winston.transports.DailyRotateFile({
          filename: 'logs/failed-login-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d', 
        }),
      ],
    });
  }

  // Log failed login attempts
  logFailedLogin(username: string, ipAddress: string) {
    this.logger.warn(`Failed login attempt: ${username} from IP ${ipAddress}`);
  }

  // Log unauthorized API access attempts
  logUnauthorizedAccess(route: string, username: string, ipAddress: string) {
    this.logger.warn(
      `Unauthorized access attempt to ${route} by user ${username} from IP ${ipAddress}`,
    );
  }
}
