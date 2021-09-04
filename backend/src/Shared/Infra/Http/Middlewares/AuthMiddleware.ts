import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import AuthenticateUser from 'Modules/Users/Services/AuthenticateUser';
import AppError from 'Shared/Errors/AppError';

class AuthMiddleware {
  public async execute(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const header = request.header('authorization');
    if (!header) {
      throw new AppError('Authorization header is missing!', 401);
    }

    const [bearer, token] = header.split(' ');
    if (bearer !== 'Bearer') {
      throw new AppError('Authorization header must be bearer type!', 401);
    }

    const authenticateUser = container.resolve(AuthenticateUser);
    const user = await authenticateUser.execute(token);

    request.user = user;

    next();
  }
}

export default AuthMiddleware;
