import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ParticipantDto {
  @ApiProperty({ name: 'gameId', type: Number })
  @IsNumber()
  gameId: number;

  @ApiProperty({ name: 'playerId', type: Number })
  @IsNumber()
  playerId: number;
}
