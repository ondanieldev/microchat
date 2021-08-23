import Redis, { Redis as IRedis } from 'ioredis';
import CacheConfig from '../Config/CacheConfig';

import ICacheProvider from '../Models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: IRedis;

  constructor() {
    const { password, port } = CacheConfig.redis;

    this.client = new Redis({
      port,
      password,
    });
  }

  public async set(key: string, value: unknown): Promise<void> {
    await this.client.set(
      key,
      JSON.stringify(value),
      'EX',
      CacheConfig.redis.expireTime,
    );
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  public async remove(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async removeByPrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);
    const pipeline = this.client.pipeline();
    keys.forEach(key => {
      pipeline.del(key);
    });
    await pipeline.exec();
  }
}

export default RedisCacheProvider;
