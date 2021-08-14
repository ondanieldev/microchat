import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUser from 'Modules/Users/Services/CreateUser';

class UsersController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const createUser = container.resolve(CreateUser);

    const user = await createUser.execute(body);

    return response.status(201).json(classToClass(user));
  }
}

export default UsersController;
