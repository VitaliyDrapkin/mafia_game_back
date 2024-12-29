import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ScoreDto } from '@src/modules/score/models/score.dto';
import { ParticipantResponseDto } from '@src/modules/participant/models/dto/responses/participant.response.dto';

export class ScoreResponseDto extends ScoreDto {
  @ApiProperty({ name: 'id', type: Number })
  @IsNumber()
  id: number;

  @ApiProperty()
  participant: ParticipantResponseDto;
}
