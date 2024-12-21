import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private timeoutValue: number = 10000) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    return next.handle().pipe(timeout(this.timeoutValue));
  }
}
