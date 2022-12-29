import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import * as authMiddleware from '../middleware/auth'
import * as authService from '../service/auth'
import { asyncHandler } from './utils';

declare global {
  namespace Express {
    interface User {
      id?: number;
    }
  }
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const body: RegisterRequest = req.body
    req.user = await authService.register(body.email, body.password, body.firstName, body.lastName)

    next();  // 미들웨어에서 토큰 생성
  } catch (error) {
    console.error(error);
    res.status(400)
      .json({ message: 'invalid request' })
    return;
  }
}

function login(req: Request, res: Response, next: NextFunction) {
  // 인증이 성공하면 passport 미들웨어에서 `user`를 세팅해서 넘겨준다.
  if (!req.user) {
    res.status(401)
      .json({ message: 'Unauthorized user'});
    return;
  }

  next();  // 미들웨어에서 토큰 생성
}

function silentRefresh(_req: Request, res: Response) {
  const accessToken = res.locals.accessToken
  if (!accessToken) {
    res.status(401)
      .json({ message: 'Unauthorized' })
    return;
  }

  res.status(201)
    .json({ token: accessToken })
}

const router = express.Router();
router.post('/register',
  asyncHandler(register),
  authMiddleware.generateToken,
);
router.post('/login',
  passport.authenticate('local', { session: false }),
  login,
  authMiddleware.generateToken,
);
router.post('/silent',
  authMiddleware.authenticateRefresh,
  silentRefresh);

export default router
