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

@Entity('scores')
export class ScoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'participant_id' })
  participantId: number;

  @ManyToOne(() => ParticipantEntity)
  @JoinColumn({ name: 'participant_id' })
  participant: ParticipantEntity;

  @Column({ type: 'decimal' })
  base: number;

  @Column({ default: 0, nullable: true })
  reason: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
