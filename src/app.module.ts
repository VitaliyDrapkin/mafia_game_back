import { Module } from '@nestjs/common';
import { CoreModule } from '@src/core/core.module';
import { PlayerModule } from '@src/modules/player/player.module';
import { GameModule } from '@src/modules/game/game.module';
import { ParticipantModule } from '@src/modules/participant/participant.module';

@Module({
  imports: [CoreModule, GameModule, PlayerModule, ParticipantModule],
})
export class AppModule {}
