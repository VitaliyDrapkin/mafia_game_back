import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { AppConfigModule } from '../config/app-config.module';
import { LoggerInterceptor } from '@src/core/interceptors/logger.interceptor';
import { TimeoutInterceptor } from '@src/core/interceptors/timeout.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from '@src/core/exceptions/http-exception.filter';
import { ApiCommunicationManagerModule } from '@src/core/api-communication-manager/api-communication-manager.module';
import { DatabaseModule } from '@src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from '@src/database/database.service';

@Global()
@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    ApiCommunicationManagerModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useExisting: DatabaseService,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new TimeoutInterceptor(10000),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [AppConfigModule, LoggerModule, ApiCommunicationManagerModule],
})
export class CoreModule {}
