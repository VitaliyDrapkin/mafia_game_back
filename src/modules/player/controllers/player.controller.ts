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
import { PlayerResponseDto } from '@src/modules/player/models/dto/responses/player.response.dto';
import { CreatePlayerRequestDto } from '@src/modules/player/models/dto/requests/create-player.request.dto';
import { PlayerPaginationResponseDto } from '@src/modules/player/models/dto/responses/player-pagination.response.dto';
import { GetPlayersQueryDto } from '@src/modules/player/models/dto/queries/get-players.query.dto';
import { UpdatePlayerRequestDto } from '@src/modules/player/models/dto/requests/update-player.request.dto';
import { PlayerService } from '@src/modules/player/services/player.service';

@ApiTags('User')
@Controller('user')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('')
  @ApiOperation({ summary: 'Create player' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'GameDto created.',
    type: PlayerResponseDto,
  })
  @ApiBody({ type: CreatePlayerRequestDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserRequestDto: CreatePlayerRequestDto,
  ): Promise<PlayerResponseDto> {
    return await this.playerService.createPlayer(createUserRequestDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get list of player' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of players successfully received.',
    type: PlayerPaginationResponseDto,
  })
  async getAll(
    @Query() query: GetPlayersQueryDto,
  ): Promise<PlayerPaginationResponseDto> {
    return await this.playerService.getByQuery(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get player by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Player successfully received.',
    type: PlayerResponseDto,
  })
  async getById(@Param('id') id: number): Promise<PlayerResponseDto> {
    return await this.playerService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Player updated.',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Player not found.',
  })
  @ApiParam({ name: 'id', required: true, description: 'Player id' })
  @ApiBody({ type: UpdatePlayerRequestDto })
  async updatePlayerById(
    @Param('id') id: number,
    @Body() playerRequestDto: UpdatePlayerRequestDto,
  ) {
    return await this.playerService.updatePlayerById(id, playerRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete player by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Player deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Player not found.',
  })
  @ApiParam({ name: 'id', required: true, description: 'Player id' })
  async remove(@Param('id') id: number) {
    return await this.playerService.deletePlayerById(id);
  }
}
