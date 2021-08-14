import jwt from 'jsonwebtoken';
import AppError from 'Shared/Errors/AppError';

import TokenConfig from '../Config/TokenConfig';
import ITokenPayload from '../DTOs/ITokenPayload';
import ITokenProvider from '../Models/ITokenProvider';

class JWTTokenProvider implements ITokenProvider {
  public generate(subject: string): string {
    const {
      jwt: { secret, expiresIn },
    } = TokenConfig;
    return jwt.sign({ subject }, secret, {
      subject,
      expiresIn,
    });
  }

  public verify(token: string): ITokenPayload {
    const {
      jwt: { secret },
    } = TokenConfig;
    try {
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new AppError('Invalid token!', 401);
    }
  }
}

export default JWTTokenProvider;
