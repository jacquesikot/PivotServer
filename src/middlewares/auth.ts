import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_KEY } from '../constants';

function auth(req: any, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token ? token : '', JWT_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
}

export default auth;
