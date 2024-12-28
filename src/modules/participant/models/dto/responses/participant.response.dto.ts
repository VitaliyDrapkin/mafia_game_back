import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParticipantDto } from '@src/modules/participant/models/participant.dto';
import { PlayerResponseDto } from '@src/modules/player/models/dto/responses/player.response.dto';

export class ParticipantResponseDto extends ParticipantDto {
  @ApiProperty({ name: 'id', type: Number })
  @IsNumber()
  id: number;

  @ApiProperty()
  player: PlayerResponseDto;
}
