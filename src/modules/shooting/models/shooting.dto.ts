import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class ShootingDto {
  @ApiProperty({ name: 'participantId', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  participantId?: number;

  @ApiProperty({ name: 'round', type: Number })
  @IsNumber()
  round: number;

  @ApiProperty({ name: 'isHit', type: Boolean })
  @IsBoolean()
  isHit: boolean;
}
