import express, { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface SessionData {
    authenticate?: boolean;
  }
}

interface LoginRequest {
  id: string;
  password: string;
}

const router = express.Router();

export function login(req: Request, res: Response, next: NextFunction) {
  if (req.session.authenticate) {
    // already login
    res.status(201).render('index', { title: 'Already Login' })
  } else {
    // verify
    // 서비스 레이어를 두는게 좋다.

    const dto: LoginRequest = req.body;
    if (dto.id === 'testid' && dto.password === 'testpassword') {
      req.session.authenticate = true;
      res.status(201).render('index', { title: 'Success Login' })
    } else {
      res.status(401)
        .render('error', {
          message: 'invalid id/password',
          error: {
            status: 401,
            stack: []
          }
        })
    }
  }
}

router.post('/login', login);

export default router
