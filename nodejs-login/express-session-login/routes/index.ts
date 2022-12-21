import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  if (req.session.authenticate) {
    res.render('index', { title: 'Express' });
  } else {
    res.render('login')
  }
});

export default router
