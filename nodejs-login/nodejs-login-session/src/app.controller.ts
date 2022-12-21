import { Controller, Get, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { SessionData } from 'express-session';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response, @Session() session: SessionData): void {
    if (session.authenticate) {
      res.redirect('/index.html')
    } else {
      res.redirect('/login.html')
    }
  }
}
