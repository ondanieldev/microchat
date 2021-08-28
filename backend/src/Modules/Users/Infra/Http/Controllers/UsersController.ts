import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUser from 'Modules/Users/Services/CreateUser';
import ShowCurrentUser from 'Modules/Users/Services/ShowCurrentUser';

class UsersController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const createUser = container.resolve(CreateUser);

    const user = await createUser.execute(body);

    return response
      .status(201)
      .json(classToClass(user, { groups: ['theirself'] }));
  }

  public async showCurrent(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;

    const showCurrentUser = container.resolve(ShowCurrentUser);

    const userData = await showCurrentUser.execute(user);

    return response
      .status(201)
      .json(classToClass(userData, { groups: ['theirself'] }));
  }
}

export default UsersController;
