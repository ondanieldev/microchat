import { container } from 'tsyringe';

import CacheConfig from './Config/CacheConfig';
import RedisCacheProvider from './Implementations/RedisCacheProvider';
import ICacheProvider from './Models/ICacheProvider';

class CacheContainers {
  public execute(): void {
    const providers = {
      redis: RedisCacheProvider,
    };

    container.registerSingleton<ICacheProvider>(
      'CacheProvider',
      providers[CacheConfig.provider],
    );
  }
}

export default CacheContainers;
