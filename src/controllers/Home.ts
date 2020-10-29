import * as express from 'express';
import { Request, Response } from 'express';

import { auth, admin } from '../middlewares';

class Home {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, auth, admin, this.home);
  }

  private home = (_req: Request, res: Response) => {
    res.send('we are live');
  };
}

export default Home;
