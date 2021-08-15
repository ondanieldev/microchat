import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import JoinRoom from 'Modules/Rooms/Services/JoinRoom';
import LeaveRoom from 'Modules/Rooms/Services/LeaveRoom';
import KickUser from 'Modules/Rooms/Services/KickUser';
import IndexRoomsUsers from 'Modules/Rooms/Services/IndexRoomsUsers';

class RoomsUsersController {
  public async join(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body, user } = request;

    const joinRoom = container.resolve(JoinRoom);

    const join = await joinRoom.execute({
      actor: user,
      data: body,
    });

    return response.status(201).json(join);
  }

  public async leave(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { room_id } = request.params;

    const leaveRoom = container.resolve(LeaveRoom);

    await leaveRoom.execute({
      actor: user,
      room_id,
    });

    return response.status(204).json();
  }

  public async kick(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user, body } = request;

    const kickUser = container.resolve(KickUser);

    await kickUser.execute({
      actor: user,
      ...body,
    });

    return response.status(204).json();
  }

  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;
    const { room_id } = request.params;

    const indexRoomsUsers = container.resolve(IndexRoomsUsers);

    const users = await indexRoomsUsers.execute({
      actor: user,
      room_id,
    });

    return response.status(200).json(classToClass(users));
  }
}

export default RoomsUsersController;
