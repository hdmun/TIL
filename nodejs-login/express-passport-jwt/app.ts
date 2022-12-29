import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import logger from 'morgan';
import passport from 'passport'

import './loaders/mysql'
import './loaders/passport'
import routers from './routes';

const app: express.Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(passport.initialize())

app.use('/', routers);

// catch 404 and forward to error handler
app.use(function(req_: Request, res_: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
    .json({ message: err.message })
});

export default app;
