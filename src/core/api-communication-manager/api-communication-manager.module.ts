import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiCommunicationManager } from './api-communication-manager.service';

@Module({
  imports: [HttpModule],
  providers: [ApiCommunicationManager],
  exports: [ApiCommunicationManager],
})
export class ApiCommunicationManagerModule {}
