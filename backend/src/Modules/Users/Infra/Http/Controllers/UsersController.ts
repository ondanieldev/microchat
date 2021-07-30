import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateUserService from 'Modules/Users/Services/CreateUser';

class UsersController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(body);

    return response.status(204).json(user);
  }
}

export default UsersController;
