import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt, { JwtPayload } from 'jsonwebtoken'

import { jwtOptions } from '../loaders/passport';

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

const router = express.Router();

function login(req: Request, res: Response) {
  // 인증이 성공하면 passport 미들웨어에서 `user`를 세팅해서 넘겨준다.
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized user'});
    return;
  }

  // 토큰 생성
  const payload: JwtPayload = { id: req.user.id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey, {
    expiresIn: '1m'
  });

  res.status(201).json({ token })
}

router.post('/login',
  passport.authenticate('local', { session: false }),
  login,
);

export default router
