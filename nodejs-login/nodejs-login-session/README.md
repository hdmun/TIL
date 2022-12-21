# nodejs-login-session

- nodejs v16.16.0
- npm 8.11.0

`nestjs`, session 기반 로그인 코드를 작성

유저 데이터 저장, 인증 관련 로직은 작성하지 않고 세션을 다루는 것에만 집중해서 작성함

## 프로젝트 생성

```
npm i -g @nestjs/cli
nest new nodejs-login-session
```


## Additional Dependency

- `express-session`
- `nestjs-session`
- `@nestjs/serve-static`
- `connect-redis`
- `ioredis`
