import { Injectable } from '@nestjs/common';
import { AppLogger } from '@src/core/logger/loger-service';
import { ApiPokemonRepository } from '@src/modules/user/repositories/api-pokemon.repository';
import { CreateUserRequestDto } from '@src/modules/user/models/dto/requests/create-user.request.dto';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { UserTransformer } from '@src/modules/user/transformers/user.transformer';
import { UserResponseDto } from '@src/modules/user/models/dto/responses/user.response.dto';
import { GetUsersQueryDto } from '@src/modules/user/models/dto/queries/get-users.query.dto';
import { PaginationTransformer } from '@src/common/transformers/pagination.transformer';
import { PaginationResponseDto } from '@src/common/interfaces/pagination.response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly appLogger: AppLogger,
    private readonly apiPokemonRepository: ApiPokemonRepository,
    private readonly userRepository: UserRepository,
  ) {
    appLogger.setContext(`${this.constructor.name}`);
  }

  public async createUser(
    user: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const userEntity = await this.userRepository.addOne(user);
    return UserTransformer.toResponseDto(userEntity);
  }

  public async getByQuery(
    query: GetUsersQueryDto,
  ): Promise<PaginationResponseDto<UserResponseDto>> {
    const [usersEntities, totalItems] =
      await this.userRepository.getManyByQuery(query, {
        take: query.take,
        skip: query.skip,
      });

    return PaginationTransformer.toPaginationResponseDto(
      usersEntities,
      totalItems,
      query.take,
      query.skip,
      UserTransformer.toResponseDto,
    );
  }
}
