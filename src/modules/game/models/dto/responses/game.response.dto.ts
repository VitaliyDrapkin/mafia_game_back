import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GameDto } from '@src/modules/game/models/game.dto';
import { OmitType } from '@nestjs/mapped-types';
import { ParticipantResponseDto } from '@src/modules/participant/models/dto/responses/participant.response.dto';

export class GameResponseDto extends OmitType(GameDto, ['finishedAt']) {
  @ApiProperty({ name: 'id', type: Number })
  @IsNumber()
  id: number;

  @ApiProperty({ name: 'finishedAt', type: Number })
  @IsNumber()
  @IsOptional()
  finishedAt?: number;

  @ApiProperty({ name: 'finishedAt', type: Number })
  @IsArray()
  participants?: ParticipantResponseDto[];
}
