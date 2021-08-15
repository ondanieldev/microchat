import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserSession from 'Modules/Users/Services/CreateUserSession';
import DeleteUserSession from 'Modules/Users/Services/DeleteUserSession';

class UsersController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const createUserSession = container.resolve(CreateUserSession);

    const user = await createUserSession.execute(body);

    return response
      .status(201)
      .json(classToClass(user, { groups: ['theirself'] }));
  }

  public async delete(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;

    const deleteUserSession = container.resolve(DeleteUserSession);

    await deleteUserSession.execute(user);

    return response.status(204).json();
  }
}

export default UsersController;
