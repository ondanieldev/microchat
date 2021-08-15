import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Room from 'Modules/Rooms/Infra/TypeORM/Entities/Room';
import Join from 'Modules/Rooms/Infra/TypeORM/Entities/Join';

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
  token?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Room, room => room.moderator)
  rooms: Room[];

  @OneToMany(() => Join, join => join.user)
  joins: Join[];
}

export default User;
