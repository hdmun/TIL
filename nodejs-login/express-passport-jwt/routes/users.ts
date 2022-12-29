import express, { Request, Response } from 'express';
import * as authMiddleware from '../middleware/auth'

const router = express.Router();

/* GET users listing. */
function usersAll(_req: Request, res: Response) {
  res.status(200).json({ message: 'respond with a resource' });
}

router.get('/',
  authMiddleware.authenticateAccess,
  usersAll
);

export default router;
