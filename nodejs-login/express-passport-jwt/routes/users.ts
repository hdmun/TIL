import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = express.Router();

/* GET users listing. */
function usersAll(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
}

router.get('/',
  passport.authenticate('jwt', { session: false }),
  usersAll
);

export default router;
