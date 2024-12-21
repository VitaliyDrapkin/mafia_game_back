import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationQueryDto } from '@src/common/interfaces/pagination.query.dto';

export class GetUsersQueryDto extends PaginationQueryDto {
  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  id?: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  age?: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  age_from?: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  age_to?: number;
}
