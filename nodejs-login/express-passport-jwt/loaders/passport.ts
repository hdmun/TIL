import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';

import * as authService from '../service/auth';


const passportConfig = {
  usernameField: 'email',
  passwordField: 'password',
};
passport.use('local', new LocalStrategy(passportConfig, authService.verifyPassport));
