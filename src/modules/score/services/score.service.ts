import { Injectable } from '@nestjs/common';
import { AppLogger } from '@src/core/logger/loger-service';
import { ParticipantRepository } from '@src/modules/participant/repositories/participant.repository';

@Injectable()
export class ScoreService {
  constructor(
    private readonly appLogger: AppLogger,
    private readonly participantRepository: ParticipantRepository,
  ) {
    appLogger.setContext(`${this.constructor.name}`);
  }
}
