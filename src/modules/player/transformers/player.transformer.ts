import { PlayerResponseDto } from '@src/modules/player/models/dto/responses/player.response.dto';
import { PlayerEntity } from '@src/modules/player/models/entities/player.entity';

export class PlayerTransformer {
  static toResponseDto(player: PlayerEntity): PlayerResponseDto {
    return {
      id: player.id,
      nickname: player.nickname,
      fullName: player.fullName,
      avatarUrl: player.avatarUrl,
    };
  }
}
