import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { UserTypeEnum } from '@src/modules/user/models/enums/user-type.enum';

export class UserDto {
  @ApiProperty({ name: 'nickname', type: String })
  @IsString()
  nickname: string;

  @ApiProperty({ name: 'fullName', example: 'Alex', type: String })
  @IsString()
  fullName: string;

  @ApiProperty({
    name: 'email',
    example: 'user@mail.com',
    type: String,
  })
  @IsString()
  email: string;

  @ApiProperty({
    name: 'age',
    example: 30,
    type: Number,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    name: 'type',
    enum: UserTypeEnum,
  })
  @IsEnum(UserTypeEnum)
  type: UserTypeEnum;
}
