import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '@src/common/interfaces/pagination.query.dto';
import { WinnerEnum } from '@src/modules/game/models/enum/winner.enum';

export class GetGamesQueryDto extends PaginationQueryDto {
  @ApiProperty({
    enum: WinnerEnum,
    required: false,
  })
  @IsEnum(WinnerEnum)
  @IsOptional()
  winner?: WinnerEnum;
}
