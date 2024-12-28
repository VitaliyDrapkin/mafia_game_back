import { GameEntity } from '@src/modules/game/models/entities/game.entity';
import { GameResponseDto } from '@src/modules/game/models/dto/responses/game.response.dto';
import { ParticipantTransformer } from '@src/modules/participant/transformers/participant.transformer';

export class GameTransformer {
  static toResponseDto(game: GameEntity): GameResponseDto {
    return {
      id: game.id,
      finishedAt: game.finishedAt
        ? new Date(game.finishedAt).getTime()
        : undefined,
      winner: game.winner,
      participants: game.participants.map((participant) =>
        ParticipantTransformer.toResponseDto(participant),
      ),
    };
  }
}
