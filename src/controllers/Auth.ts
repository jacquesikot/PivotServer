import express from 'express';

import { UserService } from '../services';
import { validateAuth } from '../validation';

const services = new UserService();

class Auth {
  public path = '/api/auth';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addUser);
  }

  private addUser: express.RequestHandler = async (req: any, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await services.findUser(req.body);
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await services.validatePassword(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send('Invalid email or password');

    const token = await services.getToken(user._id);
    res.send(token);
  };
}

export default Auth;
