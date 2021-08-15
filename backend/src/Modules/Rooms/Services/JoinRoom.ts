import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IUsersRepository from 'Modules/Users/Repositories/IUsersRepository';
import IRoomsRepository from '../Repositories/IRoomsRepository';
import IRoomsUsersRepository from '../Repositories/IRoomsUsersRepository';
import RoomUser from '../Infra/TypeORM/Entities/RoomUser';
import ICreateRoomUser from '../DTOs/ICreateRoomUser';

interface IRequest {
  actor: User;
  data: Omit<ICreateRoomUser, 'user_id'>;
}

@injectable()
class JoinRoom {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,
  ) {}

  public async execute({
    actor,
    data: { room_id, ...rest },
  }: IRequest): Promise<RoomUser> {
    const user = await this.usersRepository.findOne({
      id: actor.id,
    });
    if (!user) {
      throw new AppError('User not found!', 404);
    }

    const room = await this.roomsRepository.findOne({
      id: room_id,
    });
    if (!room) {
      throw new AppError('Room not found!', 404);
    }

    const roomUser = await this.roomsUsersRepository.findOne({
      room_id: room.id,
      user_id: user.id,
    });
    if (roomUser) {
      throw new AppError('You are already a participant of this room!', 403);
    }

    return this.roomsUsersRepository.create({
      room_id: room.id,
      user_id: user.id,
      ...rest,
    });
  }
}

export default JoinRoom;
