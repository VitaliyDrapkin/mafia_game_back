import { ShootingEntity } from '@src/modules/shooting/models/entities/shooting.entity';
import { ShootingResponseDto } from '@src/modules/shooting/models/dto/responses/shooting.response.dto';
import { ParticipantTransformer } from '@src/modules/participant/transformers/participant.transformer';

export class ShootingTransformer {
  static toResponseDto(voting: ShootingEntity): ShootingResponseDto {
    return {
      id: voting.id,
      participantId: voting.participantId,
      participant: voting.participant
        ? ParticipantTransformer.toResponseDto(voting.participant)
        : null,
      round: voting.round,
      isHit: voting.isHit,
    };
  }
}
