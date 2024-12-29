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
import { PlayerEntity } from '@src/modules/player/models/entities/player.entity';
import { ParticipantEntity } from '@src/modules/participant/models/entities/participant.entity';

@Entity('shootings')
export class ShootingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'participant_id', nullable: true })
  participantId?: number;

  @ManyToOne(() => ParticipantEntity)
  @JoinColumn({ name: 'participant_id' })
  participant?: ParticipantEntity;

  @Column({ type: 'int' })
  round: number;

  @Column({ default: false })
  isHit: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
