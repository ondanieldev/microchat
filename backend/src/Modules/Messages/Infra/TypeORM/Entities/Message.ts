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

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  user_id?: string;

  @Column()
  room_id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Room, room => room.messages)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}

export default Message;
