import { Body, Controller, Delete, Logger, Post, Res, Session, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { SessionData } from 'express-session';
import { AuthService } from './auth.service';

declare module 'express-session' {
  interface SessionData {
    authenticate?: boolean;
  }
}

export interface LoginRequest {
  id: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  login(@Body() dto: LoginRequest, @Session() session: SessionData): LoginResponse {
    try {
      this.logger.log('request /auth/login', dto.id, dto.password)

      if (!this.authService.login(dto.id, dto.password)) {
        throw new UnauthorizedException('failed to login');
      }

      session.authenticate = true;
    } catch (error) {

      this.logger.error('failed to login', error)
      throw error;
    }

    this.logger.log('success to login', dto.id, dto.password)

    return {
      message: 'login success'
    }
  }

  @Delete('logout')
  logout(@Session() session: SessionData, @Res() res: Response) {
    delete session.authenticate;
  }
}
