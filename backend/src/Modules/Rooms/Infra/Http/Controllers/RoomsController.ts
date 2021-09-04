import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateRoom from 'Modules/Rooms/Services/CreateRoom';
import IndexRooms from 'Modules/Rooms/Services/IndexRooms';
import CreateMessage from 'Modules/Messages/Services/CreateMessage';
import IMessageType from 'Modules/Messages/DTOs/IMessageType';

class RoomsController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body, user, sockets } = request;

    const createRoom = container.resolve(CreateRoom);

    const room = await createRoom.execute({
      actor: user,
      data: body,
    });

    const createMessage = container.resolve(CreateMessage);
    createMessage
      .execute({
        actor: user,
        data: {
          content: `${user.nickname} has created the room.`,
          room_id: room.id,
          type: IMessageType.info,
        },
      })
      .then(message => {
        sockets.to(room.id).emit('message', message);
      })
      .catch();

    return response.status(201).json(room);
  }

  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { query } = request;

    const indexRooms = container.resolve(IndexRooms);

    const rooms = await indexRooms.execute(query);

    return response.status(200).json(rooms);
  }
}

export default RoomsController;
