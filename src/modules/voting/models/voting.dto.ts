import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class VotingDto {
  @ApiProperty({ name: 'participantId', type: Number })
  @IsNumber()
  participantId: number;

  @ApiProperty({ name: 'round', type: Number })
  @IsNumber()
  round: number;

  @ApiProperty({ name: 'voteCount', type: Number })
  @IsNumber()
  voteCount: number;

  @ApiProperty({ name: 'isExcluded', type: Boolean })
  @IsBoolean()
  isExcluded: boolean;

  @ApiProperty({ name: 'revoteNumber', type: Number })
  @IsNumber()
  revoteNumber: number;
}
