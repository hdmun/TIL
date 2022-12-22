import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import * as authService from '../service/auth';


const passportConfig = {
  usernameField: 'id',
  passwordField: 'password',
};
passport.use('local', new LocalStrategy(passportConfig, authService.verifyPassport));


export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jwt-secret-key',
};
passport.use('jwt', new JwtStrategy(jwtOptions, authService.verifyJwtToken));
