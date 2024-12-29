import { PlayerTransformer } from '@src/modules/player/transformers/player.transformer';
import { VotingEntity } from '@src/modules/voting/models/entities/voting.entity';
import { VotingResponseDto } from '@src/modules/voting/models/dto/responses/voting.response.dto';
import { ParticipantTransformer } from '@src/modules/participant/transformers/participant.transformer';

export class VotingTransformer {
  static toResponseDto(voting: VotingEntity): VotingResponseDto {
    return {
      id: voting.id,
      participantId: voting.participantId,
      participant: voting.participant
        ? ParticipantTransformer.toResponseDto(voting.participant)
        : null,
      round: voting.round,
      voteCount: voting.voteCount,
      isExcluded: voting.isExcluded,
      revoteNumber: voting.revoteNumber,
    };
  }
}
