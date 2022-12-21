import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import expressSession from "express-session";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import authRouter from './routes/auth'
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app: express.Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  secret: 'session-secret',
  resave: false,  // recommand
  saveUninitialized: false,  // recommand
  cookie: {
    maxAge: 60 * 1000,  // 예제용 코드이므로 대충 1분으로 잡자
  }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

export default app;
