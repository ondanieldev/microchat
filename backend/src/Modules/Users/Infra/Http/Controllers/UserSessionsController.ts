import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateUserSession from 'Modules/Users/Services/CreateUserSession';

class UsersController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const createUserSession = container.resolve(CreateUserSession);

    const data = await createUserSession.execute(body);

    return response.status(200).json(data);
  }
}

export default UsersController;
