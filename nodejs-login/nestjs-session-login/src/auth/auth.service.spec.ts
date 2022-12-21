import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('로그인 실패 테스트', () => {
    // given
    const id = 'failedId'
    const password = ''

    // when
    const authenticate = service.login(id, password)

    // then
    expect(authenticate).toBe(false);
  })

  it('로그인 성공 테스트', () => {
    // given
    const id = 'id'
    const password = 'password'

    // when
    const authenticate = service.login(id, password)

    // then
    expect(authenticate).toBe(true);
  })
});
