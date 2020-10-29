import { Response, NextFunction } from 'express';

function admin(req: any, res: Response, next: NextFunction) {
  if (!req.user.isAdmin) return res.status(403).send('Access Denied');

  next();
}

export default admin;
