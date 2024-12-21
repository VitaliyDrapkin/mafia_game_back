import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppLogger } from '@src/core/logger/loger-service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly appLogger: AppLogger) {
    appLogger.setContext(`${this.constructor.name}`);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<[]> {
    const request = context.switchToHttp().getRequest();
    const { path, body, query, method } = request;

    this.appLogger.log(
      '--------------- NEW Request ---------------\n%s',
      JSON.stringify({ path, method, body, query }),
    );

    return next.handle();
  }
}
