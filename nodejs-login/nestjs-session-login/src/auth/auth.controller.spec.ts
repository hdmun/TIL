import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController, LoginRequest } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
  describe('login()', () => {
    it('로그인 실패 테스트', () => {
      // given
      const dto: LoginRequest = {
        id: 'failedId',
        password: '',
      };
      const session = {
        cookie: { originalMaxAge: 3000 }
      };

      const spy = jest.spyOn(service, 'login').mockReturnValue(false);
      const login = () => controller.login(dto, session)

      // when, then
      expect(login).toThrow(UnauthorizedException);
      expect(spy).toBeCalledWith(dto.id, dto.password);
    });

    it('로그인 성공 테스트', () => {
      // given
      const dto: LoginRequest = {
        id: 'testId',
        password: 'testPassword',
      };
      const session = {
        cookie: { originalMaxAge: 3000 }
      };

      // when
      const res = controller.login(dto, session);

      // then
      expect(res.message).toBe('login success');
    });
  });
});
