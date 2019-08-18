// @ts-ignore
import session from 'express-session';
// @ts-ignore
import connectMongo from 'connect-mongo';

import { mongoose } from '../database';
import config from './config';

const MongoStore: any = connectMongo(session);

const initSession = (): any => {
  if (process.env.NODE_ENV === 'production') {
    return session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      unset: 'destroy',
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    });
  } else {
    return session({
      secret: config.sessionSecret,
      resave: false,
      unset: 'destroy',
      saveUninitialized: true
    });
  }
};

export default initSession();
