import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameEntity } from '@src/modules/game/models/entities/game.entity';
import { PlayerEntity } from '@src/modules/player/models/entities/player.entity';

@Entity('participants')
export class ParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'game_id' })
  gameId: number;

  @ManyToOne(() => GameEntity, (game) => game.participants)
  @JoinColumn({ name: 'game_id' })
  game: GameEntity;

  @Column({ name: 'player_id' })
  playerId: number;

  @ManyToOne(() => PlayerEntity)
  @JoinColumn({ name: 'player_id' })
  player: PlayerEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
