import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { format } from 'winston';
import process from 'node:process';

@Injectable()
export class AppLogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_TO_FILE || 'info',
      defaultMeta: {
        context: 'NestJS',
      },
      format: winston.format.combine(format.splat()),
      transports: [
        new winston.transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ message, level, context, ...meta }) => {
              return `[${context}] [${level}] ${message} ${JSON.stringify(meta)}`;
            }),
          ),
        }),
        ...(process.env.LOG_TO_FILE === 'true'
          ? [
              new winston.transports.File({
                filename: 'logs/app.log',
                level: 'info',
                format: winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.json(),
                ),
              }),
            ]
          : []),
      ],
    });
  }

  error(message: string, ...meta: any[]): void {
    this.logger.error(message, ...meta);
  }

  log(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta);
  }

  warn(message: string, ...meta: any[]): void {
    this.logger.warn(message, ...meta);
  }

  debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, ...meta);
  }

  verbose(message: string, ...meta: any[]): void {
    this.logger.verbose(message, ...meta);
  }

  setContext(context: string): void {
    this.logger.defaultMeta = { ...this.logger.defaultMeta, context };
  }
}
