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
  login(@Res() res: Response, @Body() dto: LoginRequest, @Session() session: SessionData): void {
    try {
      this.logger.log(`request /auth/login', id: ${dto.id}, password: ${dto.password}`)

      if (!this.authService.login(dto.id, dto.password)) {
        throw new UnauthorizedException('failed to login');
      }

      session.authenticate = true;
    } catch (error) {

      this.logger.error('failed to login', error)
      res.redirect('/login.html')
      // throw error;
    }

    this.logger.log(`success to login id: ${dto.id}, password: ${dto.password}`)

    res.redirect('/index.html')
    // return { message: 'login success' }
  }

  @Delete('logout')
  logout(@Session() session: SessionData, @Res() res: Response) {
    delete session.authenticate;
  }
}
