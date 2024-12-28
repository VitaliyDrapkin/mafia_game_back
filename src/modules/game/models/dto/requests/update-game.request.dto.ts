import { PartialType } from '@nestjs/swagger';
import { GameDto } from '@src/modules/game/models/game.dto';
import { WinnerEnum } from '@src/modules/game/models/enum/winner.enum';

export class UpdateGameRequestDto extends PartialType(GameDto) {
}
