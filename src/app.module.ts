import { Module } from '@nestjs/common';
import { CoreModule } from '@src/core/core.module';
import { UserModule } from '@src/modules/user/user.module';

@Module({
  imports: [CoreModule, UserModule],
})
export class AppModule {}
