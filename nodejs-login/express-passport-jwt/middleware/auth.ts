import { NextFunction, Request, Response } from "express";
import { ExtractJwt } from 'passport-jwt';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';


export const jwtSecret = 'jwt-secret-key'

export function generateRefreshToken(userId: number) {
  return jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: '14 days'
  });
}

export function generateAccessToken(userId: number) {
  return jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: '12h'
  });
}

export function extractRefreshToken(req: Request): string | null {
  const refreshToken = req.cookies['refreshToken']
  return refreshToken;
}

const JwtVerifyResult = {
  Success: 'success',
  Expired: 'expired',
  Invalid: 'invalid',
} as const
type JwtVerifyResult = typeof JwtVerifyResult[keyof typeof JwtVerifyResult];

export function verifyJwtToken(token: string): [JwtVerifyResult, JwtPayload | null] {
  try {
    const payload = jwt.verify(token, jwtSecret) as JwtPayload
    return [JwtVerifyResult.Success, payload]
  } catch (err) {
    console.log(typeof err, err)
    if (err instanceof TokenExpiredError) {
      return [JwtVerifyResult.Expired, null]
    }
    // return [JwtVerifyResult.Invalid, null]
    throw err;  // enum 리턴을 할까, 에러 전파를 할까
  }
}

function verifyRefreshToken(req: Request): [boolean, JwtPayload] {
  const refreshToken = extractRefreshToken(req);
  if (!refreshToken) {
    return [false, null];
  }

  const [result, payload] = verifyJwtToken(refreshToken)
  return [result === JwtVerifyResult.Success, payload];
}

export function authenticateAccess(req: Request, res: Response, next: NextFunction): void {
  const extractToken = ExtractJwt.fromAuthHeaderAsBearerToken();
  const accessToken = extractToken(req);
  if (!accessToken) {
    res.status(401).json({ message: 'Invalid token' })
    return;
  }

  const [result, _] = verifyJwtToken(accessToken);
  switch (result) {
    case JwtVerifyResult.Success:
      next();
      break;
    case JwtVerifyResult.Expired:
      break;
    default:
      break;
  }

  res.status(401).json({ message: 'Invalid token' })
}

export function authenticateRefresh(req: Request, res: Response, next: NextFunction): void {
  const [verified, payload] = verifyRefreshToken(req)
  if (!verified || !payload) {
    res.status(400)
      .json({ message: 'Unauthorized RefreshToken' })
    return;
  }

  // AccessToken 재발급
  res.locals.accessToken = {
    accessToken: generateAccessToken(payload.id)
  }

  // RefreshToken 갱신
  const refreshToken = generateRefreshToken(payload.id)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    // secure: true  // https
  })

  next();  // 라우터로 넘김
}

export function generateToken(req: Request, res: Response): void {
  if (!req.user) {
    res.status(500)
      .json({ message: 'invalid user' })
  }

  // 토큰 생성
  const accessToken = generateAccessToken(req.user.id)
  const refreshToken = generateRefreshToken(req.user.id)

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    // secure: true  // https
  })
  res.status(201)
    .json({ token: accessToken })
}
