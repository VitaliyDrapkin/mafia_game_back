import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParticipantEntity } from '@src/modules/participant/models/entities/participant.entity';

@Entity('votings')
export class VotingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'participant_id' })
  participantId: number;

  @ManyToOne(() => ParticipantEntity)
  @JoinColumn({ name: 'participant_id' })
  participant: ParticipantEntity;

  @Column({ type: 'int' })
  round: number;

  @Column({ type: 'int', default: 0 })
  voteCount: number;

  @Column({ default: false })
  isExcluded: boolean;

  @Column({ default: 0 })
  revoteNumber: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
