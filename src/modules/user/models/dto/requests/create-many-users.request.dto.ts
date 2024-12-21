import { ApiProperty } from '@nestjs/swagger';
import { CreateUserRequestDto } from '@src/modules/user/models/dto/requests/create-user.request.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateManyUsersRequestDto {
  @ApiProperty({
    type: CreateUserRequestDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateUserRequestDto)
  @IsArray()
  examples: CreateUserRequestDto;
}
