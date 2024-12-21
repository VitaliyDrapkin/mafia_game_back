import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequestDto } from '@src/modules/user/models/dto/requests/create-user.request.dto';
import { UserResponseDto } from '@src/modules/user/models/dto/responses/user.response.dto';
import { UpdateUserRequestDto } from '@src/modules/user/models/dto/requests/update-user.request.dto';
import { GetUsersQueryDto } from '@src/modules/user/models/dto/queries/get-users.query.dto';
import { CreateManyUsersRequestDto } from '@src/modules/user/models/dto/requests/create-many-users.request.dto';
import { UserTypeEnum } from '@src/modules/user/models/enums/user-type.enum';
import { UserService } from '@src/modules/user/services/user.service';
import { UserPaginationResponseDto } from '@src/modules/user/models/dto/responses/user-pagination.response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'UserDto created.',
    type: UserResponseDto,
  })
  @ApiBody({ type: CreateUserRequestDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(createUserRequestDto);
  }

  @Post('many')
  @ApiOperation({ summary: 'Create many examples' })
  @ApiBody({ type: CreateManyUsersRequestDto })
  @HttpCode(HttpStatus.CREATED)
  createMany(
    @Body() createManyExamplesRequestDto: CreateManyUsersRequestDto,
  ): CreateManyUsersRequestDto {
    return createManyExamplesRequestDto;
  }

  @Get('all')
  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users successfully received.',
    type: UserPaginationResponseDto,
  })
  async getAll(
    @Query() query: GetUsersQueryDto,
  ): Promise<UserPaginationResponseDto> {
    return await this.userService.getByQuery(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Example found.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Example not found.',
  })
  @ApiParam({ name: 'id', required: true, description: 'Example id' })
  getOne(@Param('id') id: number): UserResponseDto {
    if (id === 1) {
      return {
        id: 1,
        nickname: 'nick',
        email: 'email',
        type: UserTypeEnum.USER,
        fullName: 'Full name',
        age: 30,
      };
    }
    throw new HttpException('Example not found.', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Example updated.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Example not found.',
  })
  @ApiParam({ name: 'id', required: true, description: 'Example id' })
  @ApiBody({ type: UpdateUserRequestDto })
  update(
    @Param('id') id: number,
    @Body() updateExampleDto: UpdateUserRequestDto,
  ): UserResponseDto {
    if (id === 1) {
      return { id: 1, ...updateExampleDto };
    }
    throw new HttpException('Example not found.', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Example updated.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Example not found.',
  })
  @ApiParam({ name: 'id', required: true, description: 'Example id' })
  @ApiBody({ type: UpdateUserRequestDto })
  partialUpdate(
    @Param('id') id: number,
    @Body() updateExampleDto: UpdateUserRequestDto,
  ) {
    if (id === 1) {
      return {
        id: 1,
        name: 'UserDto by id',
        description: 'UserDto by id',
        ...updateExampleDto,
      };
    }
    throw new HttpException('Example not found.', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Example deleted.',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Example not found.',
  })
  @ApiParam({ name: 'id', required: true, description: 'Example id' })
  remove(@Param('id') id: number): string {
    if (id === 1) {
      return 'Example deleted';
    }
    throw new HttpException('Example not found.', HttpStatus.NOT_FOUND);
  }
}
