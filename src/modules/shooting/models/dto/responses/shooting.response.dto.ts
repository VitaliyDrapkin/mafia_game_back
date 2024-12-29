import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ShootingDto } from '@src/modules/shooting/models/shooting.dto';
import { ParticipantResponseDto } from '@src/modules/participant/models/dto/responses/participant.response.dto';

export class ShootingResponseDto extends ShootingDto {
  @ApiProperty({ name: 'id', type: Number })
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsOptional()
  participant?: ParticipantResponseDto;
}
