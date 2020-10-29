import { PORT } from './constants';
import App from './config/appServer';
import { Home, Users, Auth } from './controllers';

const app = new App([new Home(), new Users(), new Auth()], PORT);

if (!process.env.JWT_KEY) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.listen();
