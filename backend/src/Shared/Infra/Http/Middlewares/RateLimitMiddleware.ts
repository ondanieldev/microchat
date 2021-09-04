import ExpressRateLimit, { RateLimit } from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

class RateLimitMiddleware {
  public execute(): RateLimit {
    return ExpressRateLimit({
      store: new RedisStore({
        client: new Redis({
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
        }),
        expiry: Number(process.env.RATE_LIMIT_EXPIRY),
      }),
      max: Number(process.env.RATE_LIMIT_MAX),
    });
  }
}

export default RateLimitMiddleware;
