import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VotingDto } from '@src/modules/voting/models/voting.dto';
import { ParticipantResponseDto } from '@src/modules/participant/models/dto/responses/participant.response.dto';

export class VotingResponseDto extends VotingDto {
  @ApiProperty({ name: 'id', type: Number })
  @IsNumber()
  id: number;

  @ApiProperty()
  participant: ParticipantResponseDto;
}
