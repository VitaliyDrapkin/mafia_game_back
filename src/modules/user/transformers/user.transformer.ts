import { UserResponseDto } from '@src/modules/user/models/dto/responses/user.response.dto';
import { UserEntity } from '@src/modules/user/models/entities/user.entity';

export class UserTransformer {
  static toResponseDto(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      nickname: user.nickname,
      fullName: user.fullName,
      email: user.email,
      age: user.age,
      type: user.type,
    };
  }
}
