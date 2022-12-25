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
    // todo: verify payload expired date
    // const expiredDate = new Date(payload.exp * 1000);
    // new Date() > payload.exp * 1000

    // db 접근 흠...
    const user = UserRepository.findOneById(payload.id as number);
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


export function login(email: string, password: string): User | null {
  const user = UserRepository.findOneBy(email);
  if (!user) {
    return null
  }

  // 임시
  if (user.password !== password) {
    return null;
  }

  return user;
}
