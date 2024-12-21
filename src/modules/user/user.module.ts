import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from '@src/modules/user/services/user.service';
import { ApiPokemonRepository } from '@src/modules/user/repositories/api-pokemon.repository';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { UserEntity } from '@src/modules/user/models/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, ApiPokemonRepository, UserRepository],
})
export class UserModule {}
