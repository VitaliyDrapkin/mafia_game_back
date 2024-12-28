import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepository } from '@src/common/repositories/base-repository';
import { GetPlayersQueryDto } from '@src/modules/player/models/dto/queries/get-players.query.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantEntity } from '@src/modules/participant/models/entities/participant.entity';

@Injectable()
export class ParticipantRepository extends BaseRepository<
  ParticipantEntity,
  GetPlayersQueryDto
> {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
  ) {
    super(participantRepository);
  }

  protected filterStrategies(): Record<
    string,
    (value: any) => FindOptionsWhere<ParticipantEntity>
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
