import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateRoom from 'Modules/Rooms/Services/CreateRoom';
import IndexRooms from 'Modules/Rooms/Services/IndexRooms';

class RoomsController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body, user } = request;

    const createRoom = container.resolve(CreateRoom);

    const room = await createRoom.execute({
      actor: user,
      data: body,
    });

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
