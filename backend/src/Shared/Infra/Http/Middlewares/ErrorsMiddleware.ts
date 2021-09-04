import { Request, Response, NextFunction } from 'express';
import { getLogger } from 'log4js';

import AppError from 'Shared/Errors/AppError';

const logger = getLogger('errors');

class ErrorsMiddleware {
  public execute(
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction,
  ): Response {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ error: err.message });
    }

    logger.error(err);

    return response.status(500).json({ error: 'Internal server error.' });
  }
}

export default ErrorsMiddleware;
