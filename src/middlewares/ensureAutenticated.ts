import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface TokenPayloud{
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAutenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader){
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const {sub} = decoded as TokenPayloud;

    request.user = {
      id: sub,
    };

    return next();
  } catch{
    throw new AppError('Invalid JWT token', 401);
  }

}
