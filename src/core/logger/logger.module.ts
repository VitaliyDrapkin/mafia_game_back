import { Module } from '@nestjs/common';
import { AppLogger } from '@src/core/logger/loger-service';

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
