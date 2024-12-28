import { Module } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from '@src/modules/game/models/entities/game.entity';
import { GameService } from '@src/modules/game/services/game.service';
import { GameRepository } from '@src/modules/game/repositories/game.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  controllers: [GameController],
  providers: [GameService, GameRepository],
})
export class GameModule {}
