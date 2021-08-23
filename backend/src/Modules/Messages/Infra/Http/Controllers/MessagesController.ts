import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMessage from 'Modules/Messages/Services/CreateMessage';
import IndexMessages from 'Modules/Messages/Services/IndexMessages';

class MessagesControllers {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user, body, sockets } = request;

    const createMessage = container.resolve(CreateMessage);

    const message = await createMessage.execute({
      actor: user,
      data: body,
    });

    sockets.to(body.room_id).emit('message', message);

    return response.status(201).json(message);
  }

  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user, query } = request;
    const { room_id } = request.params;

    const indexMessages = container.resolve(IndexMessages);

    const messages = await indexMessages.execute({
      actor: user,
      room_id,
      ...query,
    });

    return response.status(200).json(classToClass(messages));
  }
}

export default MessagesControllers;
