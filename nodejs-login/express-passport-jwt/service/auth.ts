import { VerifiedCallback } from "passport-jwt";
import { IVerifyOptions } from "passport-local";
import { JwtPayload } from 'jsonwebtoken';

import User from "../entities/user";
import * as UserRepository from '../repository/user'


export function verifyPassport(
  username: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
): void {
  try {
    const loginResult = login(username, password);
    if (loginResult === null) {
      done(null, null, { message: 'invalid username or password' });
      return;
    }

    done(null, loginResult);
  } catch (error) {
    console.error(error);
    done(error);
  }
};


export function verifyJwtToken(payload: JwtPayload, done: VerifiedCallback): void {
  try {
    const user = UserRepository.findOneBy(payload.sub);
    if (user === null) {
      done(null, false, { message: 'Unauthorized token' });
      return;
    }

    done(null, user);
  } catch (error) {
    console.error(error);
    done(error, false);
  }
}


export function login(id: string, password: string): User | null {
  const user = UserRepository.findOneBy(id);
  if (!user) {
    return null
  }

  // 임시
  if (password !== 'testpassword') {
    return null;
  }

  return user;
}
