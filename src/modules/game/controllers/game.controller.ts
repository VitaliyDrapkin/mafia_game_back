import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GameResponseDto } from '@src/modules/game/models/dto/responses/game.response.dto';
import { CreateGameRequestDto } from '@src/modules/game/models/dto/requests/create-game.request.dto';
import { GameService } from '@src/modules/game/services/game.service';
import { GamePaginationResponseDto } from '@src/modules/game/models/dto/responses/game-pagination.response.dto';
import { GetGamesQueryDto } from '@src/modules/game/models/dto/queries/get-games.query.dto';
import { UpdateGameRequestDto } from '@src/modules/game/models/dto/requests/update-game.request.dto';
import { log } from 'winston';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('')
  @ApiOperation({ summary: 'Create game' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Game created.',
    type: GameResponseDto,
  })
  @ApiBody({ type: CreateGameRequestDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createGameRequestDto: CreateGameRequestDto,
  ): Promise<GameResponseDto> {
    console.log(createGameRequestDto);
    return await this.gameService.createGame(createGameRequestDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get list of games' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of games successfully received.',
    type: GamePaginationResponseDto,
  })
  async getAll(
    @Query() query: GetGamesQueryDto,
  ): Promise<GamePaginationResponseDto> {
    return await this.gameService.getByQuery(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get game by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Game successfully received.',
    type: GameResponseDto,
  })
  async getById(@Param('id') id: number): Promise<GameResponseDto> {
    return await this.gameService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Game updated.',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Game not found.',
  })
  @ApiParam({ name: 'id', required: true, description: 'Game id' })
  @ApiBody({ type: UpdateGameRequestDto })
  async updateGameById(
    @Param('id') id: number,
    @Body() playerRequestDto: UpdateGameRequestDto,
  ) {
    return await this.gameService.updateGameById(id, playerRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete player by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Game deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Game not found.',
  })
  @ApiParam({ name: 'id', required: true, description: 'Game id' })
  async remove(@Param('id') id: number) {
    return await this.gameService.deleteGameById(id);
  }
}
