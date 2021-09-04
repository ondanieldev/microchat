import { container } from 'tsyringe';

import ITokenProvider from './Models/ITokenProvider';
import JWTTokenProvider from './Implementations/JWTTokenProvider';
import TokenConfig from './Config/TokenConfig';

class TokenContainers {
  public execute(): void {
    const providers = {
      jwt: JWTTokenProvider,
    };

    container.registerSingleton<ITokenProvider>(
      'TokenProvider',
      providers[TokenConfig.provider],
    );
  }
}

export default TokenContainers;
