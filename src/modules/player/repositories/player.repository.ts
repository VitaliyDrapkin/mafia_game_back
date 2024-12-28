import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { BaseRepository } from '@src/common/repositories/base-repository';
import { PlayerEntity } from '@src/modules/player/models/entities/player.entity';
import { GetPlayersQueryDto } from '@src/modules/player/models/dto/queries/get-players.query.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerRepository extends BaseRepository<
  PlayerEntity,
  GetPlayersQueryDto
> {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
  ) {
    super(playerRepository);
  }

  protected filterStrategies(): Record<
    string,
    (value: any) => FindOptionsWhere<PlayerEntity>
  > {
    return {
      nickname: (value) => ({ nickname: Like(`%${value}%`) }),
      fullName: (value) => ({ fullName: Like(`%${value}%`) }),
      take: null,
      skip: null,
    };
  }

  protected getKeyTransformations(): Array<{ keys: string[]; newKey: string }> {
    return [];
  }

  protected getRelations(): string[] {
    return [];
  }
}
