import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WinnerEnum } from '@src/modules/game/models/enum/winner.enum';
import { ParticipantEntity } from '@src/modules/participant/models/entities/participant.entity';

@Entity('games')
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'winner',
    type: 'enum',
    enum: WinnerEnum,
    nullable: true,
  })
  winner: WinnerEnum | null;

  @Column({ name: 'finished_at', type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @OneToMany(() => ParticipantEntity, (participant) => participant.game)
  participants: ParticipantEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
