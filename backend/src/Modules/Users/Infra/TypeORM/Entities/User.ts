import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Room from 'Modules/Rooms/Infra/TypeORM/Entities/Room';
import RoomUser from 'Modules/Rooms/Infra/TypeORM/Entities/RoomUser';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nickname: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Expose({ groups: ['theirself'] })
  token?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Room, room => room.moderator)
  rooms: Room[];

  @OneToMany(() => RoomUser, roomUser => roomUser.user)
  joins: RoomUser[];
}

export default User;
