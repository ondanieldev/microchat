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
import IMessageType from 'Modules/Messages/DTOs/IMessageType';
import EnumToArray from 'Shared/Helpers/EnumToArray';

const enumToArray = new EnumToArray();

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

  @Column({ enum: enumToArray.execute(IMessageType) })
  type: IMessageType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Room, room => room.messages)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}

export default Message;
