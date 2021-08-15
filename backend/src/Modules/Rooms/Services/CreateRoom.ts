import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IUsersRepository from 'Modules/Users/Repositories/IUsersRepository';
import ICreateRoom from '../DTOs/ICreateRoom';
import IRoomsRepository from '../Repositories/IRoomsRepository';
import Room from '../Infra/TypeORM/Entities/Room';
import IRoomsUsersRepository from '../Repositories/IRoomsUsersRepository';

interface IRequest {
  actor: User;
  data: Omit<ICreateRoom, 'moderator_id'>;
}

@injectable()
class CreateRoom {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,
  ) {}

  public async execute({ actor, data }: IRequest): Promise<Room> {
    const user = await this.usersRepository.findOne({
      id: actor.id,
    });
    if (!user) {
      throw new AppError('User not found!', 404);
    }

    const room = await this.roomsRepository.create({
      moderator_id: actor.id,
      ...data,
    });

    await this.roomsUsersRepository.create({
      room_id: room.id,
      user_id: user.id,
    });

    return room;
  }
}

export default CreateRoom;
