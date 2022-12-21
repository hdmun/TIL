import express, { Request, Response } from 'express';

interface LoginRequest {
  id: string;
  password: string;
}

const router = express.Router();

export function login(req: Request, res: Response) {
  res.status(201).render('index', { title: 'Login' })
}

router.post('/login', login);

export default router
