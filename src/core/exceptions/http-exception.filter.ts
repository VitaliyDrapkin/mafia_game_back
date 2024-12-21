import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { AppLogger } from '@src/core/logger/loger-service';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly appLogger: AppLogger) {
    appLogger.setContext(`${this.constructor.name}`);
  }

  catch(exception: any, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    let status: number;
    let message: string | object;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else {
      message =
        exception?.response?.message ||
        exception?.message ||
        'Internal server error';
      status = 500;
    }

    this.appLogger.error(`Global error.`, {
      errorMessage: message,
      status: status,
    });
    response.status(status).json({
      error: {
        message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }
}
