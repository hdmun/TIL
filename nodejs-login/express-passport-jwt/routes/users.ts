import express, { Request, Response, NextFunction } from 'express';
import * as authMiddleware from '../middleware/auth'

const router = express.Router();

/* GET users listing. */
function usersAll(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
}

router.get('/',
  authMiddleware.authenticateAccess,
  usersAll
);

export default router;
