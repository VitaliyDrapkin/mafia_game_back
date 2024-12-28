import { Injectable } from '@nestjs/common';
import { AppLogger } from '@src/core/logger/loger-service';
import { PlayerRepository } from '@src/modules/player/repositories/player.repository';
import { CreatePlayerRequestDto } from '@src/modules/player/models/dto/requests/create-player.request.dto';
import { PlayerResponseDto } from '@src/modules/player/models/dto/responses/player.response.dto';
import { PlayerTransformer } from '@src/modules/player/transformers/player.transformer';
import { GetPlayersQueryDto } from '@src/modules/player/models/dto/queries/get-players.query.dto';
import { PaginationResponseDto } from '@src/common/interfaces/pagination.response.dto';
import { PaginationTransformer } from '@src/common/transformers/pagination.transformer';
import { UpdatePlayerRequestDto } from '@src/modules/player/models/dto/requests/update-player.request.dto';

@Injectable()
export class PlayerService {
  constructor(
    private readonly appLogger: AppLogger,
    private readonly PlayerRepository: PlayerRepository,
  ) {
    appLogger.setContext(`${this.constructor.name}`);
  }

  public async createPlayer(
    player: CreatePlayerRequestDto,
  ): Promise<PlayerResponseDto> {
    const playerEntity = await this.PlayerRepository.addOne(player);
    return PlayerTransformer.toResponseDto(playerEntity);
  }

  public async getByQuery(
    query: GetPlayersQueryDto,
  ): Promise<PaginationResponseDto<PlayerResponseDto>> {
    const [usersEntities, totalItems] =
      await this.PlayerRepository.getManyByQuery(query, {
        take: query.take,
        skip: query.skip,
      });

    return PaginationTransformer.toPaginationResponseDto(
      usersEntities,
      totalItems,
      query.take,
      query.skip,
      PlayerTransformer.toResponseDto,
    );
  }

  public async getById(id: number): Promise<PlayerResponseDto> {
    const playerEntity = await this.PlayerRepository.getById(id);
    return PlayerTransformer.toResponseDto(playerEntity);
  }

  public async updatePlayerById(
    id: number,
    newPlayer: UpdatePlayerRequestDto,
  ): Promise<boolean> {
    return await this.PlayerRepository.updateById(id, newPlayer);
  }

  public async deletePlayerById(id: number): Promise<boolean> {
    return await this.PlayerRepository.deleteById(id);
  }
}
