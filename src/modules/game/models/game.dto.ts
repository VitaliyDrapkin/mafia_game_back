import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { WinnerEnum } from '@src/modules/game/models/enum/winner.enum';

export class GameDto {
  @ApiProperty({ name: 'winner', enum: WinnerEnum })
  @IsEnum(WinnerEnum)
  @IsOptional()
  winner: WinnerEnum;

  @ApiProperty({ name: 'finishedAt', example: Date.now(), type: Number })
  @IsDate()
  @IsOptional()
  finishedAt?: Date;
}
