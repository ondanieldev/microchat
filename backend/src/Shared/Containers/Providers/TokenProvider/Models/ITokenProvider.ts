import ITokenPayload from '../DTOs/ITokenPayload';

interface ITokenProvider {
  generate(subject: string): string;
  verify(token: string): ITokenPayload;
}

export default ITokenProvider;
