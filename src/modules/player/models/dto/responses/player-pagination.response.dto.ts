import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from '@src/common/interfaces/pagination.response.dto';
import { PlayerResponseDto } from '@src/modules/player/models/dto/responses/player.response.dto';

export class PlayerPaginationResponseDto extends PaginationResponseDto<PlayerResponseDto> {
  @ApiProperty({ type: PlayerResponseDto, isArray: true })
  @IsArray()
  data: PlayerResponseDto[];
}
