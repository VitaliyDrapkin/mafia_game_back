import { PartialType } from '@nestjs/swagger';
import { PlayerDto } from '@src/modules/player/models/player.dto';

export class UpdatePlayerRequestDto extends PartialType(PlayerDto) {}
