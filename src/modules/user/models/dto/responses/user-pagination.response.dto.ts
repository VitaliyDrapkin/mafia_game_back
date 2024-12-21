import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from '@src/common/interfaces/pagination.response.dto';
import { UserResponseDto } from '@src/modules/user/models/dto/responses/user.response.dto';

export class UserPaginationResponseDto extends PaginationResponseDto<UserResponseDto> {
  @ApiProperty({ type: UserResponseDto, isArray: true })
  @IsArray()
  data: UserResponseDto[];
}
