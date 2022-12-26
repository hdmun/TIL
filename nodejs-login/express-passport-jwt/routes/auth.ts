import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt, { JwtPayload } from 'jsonwebtoken'

import { jwtOptions } from '../loaders/passport';
import * as authService from '../service/auth'
import { asyncHandler } from './utils';
import { User } from '../entities/user.entity';

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const router = express.Router();

async function register(req: Request, res: Response) {
  try {
    const body: RegisterRequest = req.body
    const user = await authService.register(body.email, body.password, body.firstName, body.lastName)

    // 토큰 생성
    const payload: JwtPayload = { id: user.id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey, {
      expiresIn: '1d'
    });
    res.status(201)
      .json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'invalid request' })
    return;
  }
}

function login(req: Request, res: Response) {
  // 인증이 성공하면 passport 미들웨어에서 `user`를 세팅해서 넘겨준다.
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized user'});
    return;
  }

  // 토큰 생성
  const payload: JwtPayload = { id: req.user.id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey, {
    expiresIn: '1d'
  });

  res.status(201).json({ token })
}

router.post('/register', asyncHandler(register));
router.post('/login',
  passport.authenticate('local', { session: false }),
  asyncHandler(login),
);

export default router
