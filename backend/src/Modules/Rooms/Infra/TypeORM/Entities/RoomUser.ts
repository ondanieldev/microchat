import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Room from 'Modules/Rooms/Infra/TypeORM/Entities/Room';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';

@Entity('rooms_users')
class RoomUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  room_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.participations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Room, room => room.participations)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}

export default RoomUser;
