import connectRedis from 'connect-redis';
import expressSession from 'express-session';

import redisClient from './redis';

const RedisStore = connectRedis(expressSession);
const store = new RedisStore({ client: redisClient });

const session = expressSession({
  secret: 'session-secret',
  resave: false,  // recommand
  saveUninitialized: false,  // recommand
  cookie: {
    maxAge: 60 * 1000,  // 예제용 코드이므로 대충 1분으로 잡자
  },
  store
})

export default session;

