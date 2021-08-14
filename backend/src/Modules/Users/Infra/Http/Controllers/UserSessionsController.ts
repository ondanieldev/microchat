import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateUserSession from 'Modules/Users/Services/CreateUserSession';
import DeleteUserSession from 'Modules/Users/Services/DeleteUserSession';
import { classToClass } from 'class-transformer';

class UsersController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const createUserSession = container.resolve(CreateUserSession);

    const user = await createUserSession.execute(body);

    return response.status(200).json(classToClass(user));
  }

  public async delete(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { user } = request;

    const deleteUserSession = container.resolve(DeleteUserSession);

    await deleteUserSession.execute(user);

    return response.status(200).json();
  }
}

export default UsersController;
