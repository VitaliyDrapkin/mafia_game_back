import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from '@src/common/interfaces/pagination.response.dto';
import { GameDto } from '@src/modules/game/models/game.dto';
import { GameResponseDto } from '@src/modules/game/models/dto/responses/game.response.dto';

export class GamePaginationResponseDto extends PaginationResponseDto<GameResponseDto> {
  @ApiProperty({ type: GameDto, isArray: true })
  @IsArray()
  data: GameResponseDto[];
}
