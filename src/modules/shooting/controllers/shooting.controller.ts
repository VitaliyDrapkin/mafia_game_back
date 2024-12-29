import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParticipantService } from '@src/modules/participant/services/participant.service';

@ApiTags('Participant')
@Controller('participant')
export class ShootingController {
  constructor(private readonly participantService: ParticipantService) {}
}
