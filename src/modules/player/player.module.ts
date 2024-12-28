import { Module } from '@nestjs/common';
import { PlayerRepository } from '@src/modules/player/repositories/player.repository';
import { PlayerEntity } from '@src/modules/player/models/entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from '@src/modules/player/controllers/player.controller';
import { PlayerService } from '@src/modules/player/services/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerRepository],
})
export class PlayerModule {}
