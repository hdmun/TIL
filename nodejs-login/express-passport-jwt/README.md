# express-passport-jwt

`express` 기반으로 `jwt` 로그인 인증 기능을 구현한 프로젝트입니다.

최대한 직접 구현해보고자 일부러 `nestjs`쓰지 않았는데 그냥 쓸껄 그랬습니다.

`jwt` 인증에 개발 초점이 맞춰져 있으므로 패스워드 암호화라던지 `https` 통신은 고려하지 않았습니다.

## Reference

아래는 참고한 블로그 글들입니다. (구글링으로 쉽게 찾을 수 있습니다.)

[Next.js 커스텀 로그인 구현](https://velog.io/@junsugi/Next.js-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84-%EC%8B%AC%ED%99%94%ED%8E%B8#%EC%84%9C%EB%A1%A0)

[🐱 Nest.js 로그인 서비스 만들어보기 (1)](https://velog.io/@junsugi/Nest.js-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EA%B8%B0-1)

[오늘만큼은 로그인을 부셔보자.](https://velog.io/@leehyunho2001/%EB%A1%9C%EA%B7%B8%EC%9D%B8#%EC%84%B8%EC%85%98%EC%BF%A0%ED%82%A4-%EC%9D%B8%EC%A6%9D-%EC%9E%A5%EB%8B%A8%EC%A0%90)

[OAuth 2.0 - Authorization Code Flow로 액세스 토큰 얻기](https://kimdoky.github.io/oauth/2019/05/01/oauth-serverside-flow/)

[12) 개인 프로젝트) NestJS Auth Refresh Token](https://velog.io/@algo2000/pj01-12)

[OKKY - jwt refresh Token과 자동 로그인 질문드립니다!](https://okky.kr/articles/1289527)

[Access Token과 Refresh Token을 어디에 저장해야 할까?](https://velog.io/@ohzzi/Access-Token%EA%B3%BC-Refresh-Token%EC%9D%84-%EC%96%B4%EB%94%94%EC%97%90-%EC%A0%80%EC%9E%A5%ED%95%B4%EC%95%BC-%ED%95%A0%EA%B9%8C)

[Access Token의 문제점과 Refresh Token](https://hudi.blog/refresh-token/)

[직접 만들어보며 이해하는 JWT](https://hudi.blog/self-made-jwt/)

[🤔 JWT, 정확하게 무엇이고 왜 쓰이는 걸까?](https://velog.io/@junghyeonsu/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EC%9D%84-%EC%B2%98%EB%A6%AC%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95#%EC%9E%A0%EA%B9%90-%EA%B3%B5%EA%B0%9C-%ED%82%A4public-key%EC%99%80-%EB%B9%84%EB%B0%80-%ED%82%A4secret-key)

[세션 기반 인증과 토큰 기반 인증 (feat. 인증과 인가)](https://hudi.blog/session-based-auth-vs-token-based-auth/)

[JWT 로그인방식 구현하기 (feat. session에서 jwt로)](https://velog.io/@_woogie/JWT-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EB%B0%A9%EC%8B%9D-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-feat.-session%EC%97%90%EC%84%9C-jwt%EB%A1%9C#%EA%B2%B0%EA%B5%AD-%EB%82%98%EB%8A%94)

[Passport js와 그럴듯한 refresh, access token 만들기](https://velog.io/@_woogie/Passport-js%EC%99%80-%EA%B7%B8%EB%9F%B4%EB%93%AF%ED%95%9C-refresh-access-token-%EB%A7%8C%EB%93%A4%EA%B8%B0)

[Passport로 로그인 구현하기](https://velog.io/@kdo0129/Passport%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)