import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import JoinRoom from 'Modules/Rooms/Services/JoinRoom';
import LeaveRoom from 'Modules/Rooms/Services/LeaveRoom';
import KickUser from 'Modules/Rooms/Services/KickUser';
import IndexRoomsUsers from 'Modules/Rooms/Services/IndexRoomsUsers';
import CreateMessage from 'Modules/Messages/Services/CreateMessage';
import IMessageType from 'Modules/Messages/DTOs/IMessageType';
import IndexUserRooms from 'Modules/Rooms/Services/IndexUserRooms';

class RoomsUsersController {
  public async join(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body, user, sockets } = request;

    const joinRoom = container.resolve(JoinRoom);

    const join = await joinRoom.execute({
      actor: user,
      data: body,
    });

    const createMessage = container.resolve(CreateMessage);
    createMessage
      .execute({
        actor: user,
        data: {
          content: `${user.nickname} has joined the room.`,
          room_id: body.room_id,
          type: IMessageType.info,
        },
      })
      .then(message => {
        sockets.to(body.room_id).emit('message', message);
      })
      .catch();

    return response.status(201).json(join);
  }

  public async leave(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user, sockets } = request;
    const { room_id } = request.params;

    const leaveRoom = container.resolve(LeaveRoom);

    await leaveRoom.execute({
      actor: user,
      room_id,
    });

    const createMessage = container.resolve(CreateMessage);
    createMessage
      .execute({
        actor: user,
        data: {
          content: `${user.nickname} has left the room.`,
          room_id,
          type: IMessageType.info,
        },
      })
      .then(message => {
        sockets.to(room_id).emit('message', message);
      })
      .catch();

    return response.status(204).json();
  }

  public async kick(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user, body, sockets } = request;

    const kickUser = container.resolve(KickUser);

    const kickedUser = await kickUser.execute({
      actor: user,
      ...body,
    });

    const createMessage = container.resolve(CreateMessage);
    createMessage
      .execute({
        actor: user,
        data: {
          content: `${kickedUser.nickname} has been kicked by ${user.nickname}.`,
          room_id: body.room_id,
          type: IMessageType.info,
        },
      })
      .then(message => {
        sockets.to(body.room_id).emit('message', message);
      })
      .catch();

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

  public async indexUserRooms(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;

    const indexUserRooms = container.resolve(IndexUserRooms);

    const rooms = await indexUserRooms.execute(user);

    return response.status(200).json(rooms);
  }
}

export default RoomsUsersController;
