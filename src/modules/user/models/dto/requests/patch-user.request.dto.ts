import { PartialType } from '@nestjs/swagger';
import { UserDto } from '@src/modules/user/models/user.dto';

export class PatchUserRequestDto extends PartialType(UserDto) {}
