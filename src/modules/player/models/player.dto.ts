import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PlayerDto {
  @ApiProperty({ name: 'nickname', example: 'Casper', type: String })
  @IsString()
  nickname: string;

  @ApiProperty({ name: 'fullName', example: 'Vitaliy Drapkin', type: String })
  @IsString()
  fullName: string;

  @ApiProperty({
    name: 'avatarUrl',
    type: String,
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
