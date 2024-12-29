import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepository } from '@src/common/repositories/base-repository';
import { GetPlayersQueryDto } from '@src/modules/player/models/dto/queries/get-players.query.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShootingEntity } from '@src/modules/shooting/models/entities/shooting.entity';

@Injectable()
export class ShootingRepository extends BaseRepository<
  ShootingEntity,
  GetPlayersQueryDto
> {
  constructor(
    @InjectRepository(ShootingEntity)
    private readonly shootingRepository: Repository<ShootingEntity>,
  ) {
    super(shootingRepository);
  }

  protected filterStrategies(): Record<
    string,
    (value: any) => FindOptionsWhere<ShootingEntity>
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
