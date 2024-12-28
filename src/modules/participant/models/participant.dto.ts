import { Column } from 'typeorm';

export class ParticipantDto {
  @Column({ name: 'game_id' })
  gameId: number;

  @Column({ name: 'player_id' })
  playerId: number;
}
