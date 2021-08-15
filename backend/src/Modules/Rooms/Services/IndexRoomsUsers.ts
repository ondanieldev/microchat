import { inject, injectable } from 'tsyringe';

import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import AppError from 'Shared/Errors/AppError';
import IRoomsUsersRepository from '../Repositories/IRoomsUsersRepository';

interface IRequest {
  actor: User;
  room_id: string;
}

@injectable()
class IndexRoomsUsers {
  constructor(
    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,
  ) {}

  public async execute({ actor, room_id }: IRequest): Promise<User[]> {
    const userIsParticipant = await this.roomsUsersRepository.findOne({
      room_id,
      user_id: actor.id,
    });
    if (!userIsParticipant) {
      throw new AppError('You are not a participant of this room!', 403);
    }

    const roomUsers = await this.roomsUsersRepository.find({
      room_id,
    });
    return roomUsers.map(room => room.user);
  }
}

export default IndexRoomsUsers;
