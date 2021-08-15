import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import Join from 'Modules/Rooms/Infra/TypeORM/Entities/Join';

@Entity('rooms')
class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  moderator_id?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, moderator => moderator.rooms)
  @JoinColumn({ name: 'moderator_id' })
  moderator?: User;

  @OneToMany(() => Join, join => join.room)
  joins: Join[];
}

export default Room;
