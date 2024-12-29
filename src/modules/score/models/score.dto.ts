import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ScoreDto {
  @ApiProperty({ name: 'participantId', type: Number })
  @IsNumber()
  participantId: number;

  @ApiProperty({ name: 'base', type: Number })
  @IsNumber()
  base: number;

  @ApiProperty({ name: 'reason', type: Number })
  @IsString()
  @IsOptional()
  reason?: string;
}
