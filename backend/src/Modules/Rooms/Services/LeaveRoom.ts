import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IJoinsRepository from '../Repositories/IJoinsRepository';

interface IRequest {
  actor: User;
  room_id: string;
}

@injectable()
class LeaveRoom {
  constructor(
    @inject('JoinsRepository')
    private joinsRepository: IJoinsRepository,
  ) {}

  public async execute({ actor, room_id }: IRequest): Promise<void> {
    const join = await this.joinsRepository.findOne({
      room_id,
      user_id: actor.id,
    });
    if (!join) {
      throw new AppError('You are not a participant of this room!', 403);
    }

    await this.joinsRepository.delete(join.id);
  }
}

export default LeaveRoom;
