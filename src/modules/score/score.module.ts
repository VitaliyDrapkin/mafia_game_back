import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantEntity } from '@src/modules/participant/models/entities/participant.entity';
import { ParticipantController } from '@src/modules/participant/controllers/participant.controller';
import { ParticipantService } from '@src/modules/participant/services/participant.service';
import { ParticipantRepository } from '@src/modules/participant/repositories/participant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantEntity])],
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository],
})
export class ScoreModule {}
