import { PlayerDto } from '@src/modules/player/models/player.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerResponseDto extends PlayerDto {
  @ApiProperty({ name: 'id', type: Number })
  @IsNumber()
  id: number;
}
