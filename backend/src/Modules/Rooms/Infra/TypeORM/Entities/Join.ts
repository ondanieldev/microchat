import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Room from 'Modules/Rooms/Infra/TypeORM/Entities/Room';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';

@Entity('joins')
class Join {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  room_id: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @ManyToOne(() => User, user => user.joins)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Room, room => room.joins)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}

export default Join;
