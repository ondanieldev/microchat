import AppError from 'Shared/Errors/AppError';
import ITokenPayload from '../DTOs/ITokenPayload';
import ITokenProvider from '../Models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public generate(subject: string): string {
    return `${subject}_token`;
  }

  public verify(token: string): ITokenPayload {
    const [subject, sign] = token.split('_');
    if (subject && sign && sign === 'token') {
      return {
        subject,
      };
    }
    throw new AppError('Invalid token!', 401);
  }
}

export default FakeTokenProvider;
