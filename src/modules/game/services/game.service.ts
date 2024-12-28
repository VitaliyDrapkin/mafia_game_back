import { Injectable } from '@nestjs/common';
import { AppLogger } from '@src/core/logger/loger-service';
import { PaginationTransformer } from '@src/common/transformers/pagination.transformer';
import { PaginationResponseDto } from '@src/common/interfaces/pagination.response.dto';
import { CreateGameRequestDto } from '@src/modules/game/models/dto/requests/create-game.request.dto';
import { GameResponseDto } from '@src/modules/game/models/dto/responses/game.response.dto';
import { GameRepository } from '@src/modules/game/repositories/game.repository';
import { GameTransformer } from '@src/modules/game/transformers/game.transformer';
import { GetGamesQueryDto } from '@src/modules/game/models/dto/queries/get-games.query.dto';
import { UpdateGameRequestDto } from '@src/modules/game/models/dto/requests/update-game.request.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

@Injectable()
export class GameService {
  constructor(
    private readonly appLogger: AppLogger,
    private readonly gameRepository: GameRepository,
  ) {
    appLogger.setContext(`${this.constructor.name}`);
  }

  public async createGame(
    game: CreateGameRequestDto,
  ): Promise<GameResponseDto> {
    const gameEntity = await this.gameRepository.addOne(game);
    return GameTransformer.toResponseDto(gameEntity);
  }

  public async getByQuery(
    query: GetGamesQueryDto,
  ): Promise<PaginationResponseDto<GameResponseDto>> {
    const [usersEntities, totalItems] =
      await this.gameRepository.getManyByQuery(query, {
        take: query.take,
        skip: query.skip,
      });

    return PaginationTransformer.toPaginationResponseDto(
      usersEntities,
      totalItems,
      query.take,
      query.skip,
      GameTransformer.toResponseDto,
    );
  }

  public async getById(id: number): Promise<GameResponseDto> {
    const gameEntity = await this.gameRepository.getById(id);
    return GameTransformer.toResponseDto(gameEntity);
  }

  public async updateGameById(
    id: number,
    game: UpdateGameRequestDto,
  ): Promise<boolean> {
    return await this.gameRepository.updateById(id, game);
  }

  public async deleteGameById(id: number): Promise<boolean> {
    return await this.gameRepository.deleteById(id);
  }
}
