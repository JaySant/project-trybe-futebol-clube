import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: 'Token not found' });
    }
    const token = jwt.verify(authorization as string, process.env.JWT_SECRET as string);
    req.body.user = token;
  } catch (error) {
    const e = res.status(401).json({ message: 'Token must be a valid token' });
    next(e);
  }
}
