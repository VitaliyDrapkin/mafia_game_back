import { ScoreEntity } from '@src/modules/score/models/entities/score.entity';
import { ScoreResponseDto } from '@src/modules/score/models/dto/responses/score.response.dto';
import { ParticipantTransformer } from '@src/modules/participant/transformers/participant.transformer';

export class ScoreTransformer {
  static toResponseDto(score: ScoreEntity): ScoreResponseDto {
    return {
      id: score.id,
      participantId: score.participantId,
      participant: score.participant
        ? ParticipantTransformer.toResponseDto(score.participant)
        : null,
      base: score.base,
      reason: score.reason,
    };
  }
}
