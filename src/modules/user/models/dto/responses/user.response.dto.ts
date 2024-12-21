import { UserDto } from '@src/modules/user/models/user.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto extends UserDto {
  @ApiProperty({ name: 'id', type: Number })
  @IsNumber()
  id: number;
}
