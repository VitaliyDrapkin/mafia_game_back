import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepository } from '@src/common/repositories/base-repository';
import { GetPlayersQueryDto } from '@src/modules/player/models/dto/queries/get-players.query.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VotingEntity } from '@src/modules/voting/models/entities/voting.entity';

@Injectable()
export class VotingRepository extends BaseRepository<
  VotingEntity,
  GetPlayersQueryDto
> {
  constructor(
    @InjectRepository(VotingEntity)
    private readonly votingRepository: Repository<VotingEntity>,
  ) {
    super(votingRepository);
  }

  protected filterStrategies(): Record<
    string,
    (value: any) => FindOptionsWhere<VotingEntity>
  > {
    return {
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
