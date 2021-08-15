import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import CreateMessage from 'Modules/Messages/Services/CreateMessage';

class MessagesControllers {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user, body } = request;

    const createMessage = container.resolve(CreateMessage);

    const message = await createMessage.execute({
      actor: user,
      data: body,
    });

    return response.status(201).json(message);
  }
}

export default MessagesControllers;
