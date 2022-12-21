import { DynamicModule } from '@nestjs/common';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis'
import { NestSessionOptions, SessionModule } from 'nestjs-session';

// https://github.com/iamolegga/nestjs-session/blob/master/examples/redis-store/src/session.module.ts

const RedisStore = connectRedis(session);
const redisClient = new Redis(6379, 'localhost');

const SessionMoudle_: DynamicModule = SessionModule.forRootAsync({
  imports: [],
  inject: [],
  useFactory: (): NestSessionOptions => {
    const store = new RedisStore({ client: redisClient });
    return {
      session: {
        store,
        secret: 'session-secret',
        resave: false,  // recommand
        saveUninitialized: false,  // recommand
        cookie: {
          maxAge: 60 * 1000,  // 예제용 코드이므로 대충 1분으로 잡자
        }
      },
    };
  },
});

export default SessionMoudle_
