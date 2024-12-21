import {
  Between,
  FindOptionsWhere,
  LessThan,
  Like,
  MoreThan,
  Repository,
} from 'typeorm';
import { BaseRepository } from '@src/common/repositories/base-repository';
import { UserEntity } from '@src/modules/user/models/entities/user.entity';
import { GetUsersQueryDto } from '@src/modules/user/models/dto/queries/get-users.query.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends BaseRepository<
  UserEntity,
  GetUsersQueryDto
> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
  protected filterStrategies(): Record<
    string,
    (value: any) => FindOptionsWhere<UserEntity>
  > {
    return {
      id: (value) => ({ id: value }),
      name: (value) => ({ fullName: Like(`%${value}%`) }),
      age: (value) => ({ age: value }),
      age_from: (value) => ({ age: MoreThan(value) }),
      age_to: (value) => ({ age: LessThan(value) }),
      age_range: (value: { age_from: number; age_to: number }) => ({
        age: Between(value.age_from, value.age_to),
      }),
      take: null,
      skip: null,
    };
  }

  protected getKeyTransformations(): Array<{ keys: string[]; newKey: string }> {
    return [{ keys: ['age_from', 'age_to'], newKey: 'age_range' }];
  }

  protected getRelations(): string[] {
    return [];
  }
}
