import { sign } from 'jsonwebtoken';

import TokenConfig from '../Config/TokenConfig';
import ITokenProvider from '../Models/ITokenProvider';

class JWTTokenProvider implements ITokenProvider {
  public generate(subject: string): string {
    const { secret, expiresIn } = TokenConfig;
    return sign({}, secret, {
      subject,
      expiresIn,
    });
  }
}

export default JWTTokenProvider;
