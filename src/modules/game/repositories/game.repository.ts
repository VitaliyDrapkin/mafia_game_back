import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepository } from '@src/common/repositories/base-repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from '@src/modules/game/models/entities/game.entity';
import { GetGamesQueryDto } from '@src/modules/game/models/dto/queries/get-games.query.dto';

@Injectable()
export class GameRepository extends BaseRepository<
  GameEntity,
  GetGamesQueryDto
> {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
  ) {
    super(gameRepository);
  }

  protected filterStrategies(): Record<
    string,
    (value: any) => FindOptionsWhere<GameEntity>
  > {
    return {
      winner: (value) => ({ winner: value }),
      take: null,
      skip: null,
    };
  }

  protected getKeyTransformations(): Array<{ keys: string[]; newKey: string }> {
    return [];
  }

  protected getRelations(): string[] {
    return ['participants', 'participants.player'];
  }
}
