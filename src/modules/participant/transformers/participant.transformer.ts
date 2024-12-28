import { ParticipantEntity } from '@src/modules/participant/models/entities/participant.entity';
import { ParticipantResponseDto } from '@src/modules/participant/models/dto/responses/participant.response.dto';
import { PlayerTransformer } from '@src/modules/player/transformers/player.transformer';

export class ParticipantTransformer {
  static toResponseDto(participant: ParticipantEntity): ParticipantResponseDto {
    return {
      id: participant.id,
      gameId: participant.gameId,
      playerId: participant.playerId,
      player:
        participant.player &&
        PlayerTransformer.toResponseDto(participant.player),
    };
  }
}
