interface ICacheConfig {
  provider: 'redis';
  redis: {
    port: number;
    password: string;
    expireTime: number;
  };
}

const CacheConfig = {
  provider: process.env.CACHE_PROVIDER,
  redis: {
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    expireTime: Number(process.env.CACHE_REDIS_EXPIRE_TIME),
  },
} as ICacheConfig;

export default CacheConfig;
