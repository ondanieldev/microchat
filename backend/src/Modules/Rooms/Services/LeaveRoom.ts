import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IRoomsUsersRepository from '../Repositories/IRoomsUsersRepository';

interface IRequest {
  actor: User;
  room_id: string;
}

@injectable()
class LeaveRoom {
  constructor(
    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,
  ) {}

  public async execute({ actor, room_id }: IRequest): Promise<void> {
    const roomUser = await this.roomsUsersRepository.findOne({
      room_id,
      user_id: actor.id,
    });
    if (!roomUser) {
      throw new AppError('You are not a participant of this room!', 403);
    }

    await this.roomsUsersRepository.delete(roomUser.id);
  }
}

export default LeaveRoom;
