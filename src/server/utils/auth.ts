import passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as PassportFacebook from 'passport-facebook';

import * as User from '../database/models/user';
import config from '../utils/config';

const LocalStrategy = PassportLocal.Strategy;
const FacebookStrategy = PassportFacebook.Strategy;


const initAuth = (): any => {
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done: any) => {
    User.findById(id, (err: any, user: any) => {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    (username: string, password: string, done: any) => {
      User.findOne({ username: new RegExp(username, 'i'), socialId: null }, (err: any, user: any) => {
        if (err) { return done(err); }

        if (!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        user.validatePassword(password, (err: any, isMatch: boolean) => {
          if (err) { return done(err); }
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect username or password.' });
          }
          return done(null, user);
        });

      });
    }
  ));

  const verifySocialAccount = (tokenA: any, tokenB: any, data: any, done: any) => {
    User.findOrCreate(data, (err: any, user: any) => {
      if (err) { return done(err); }
      return done(err, user);
    });
  };

  passport.use(new FacebookStrategy(config.facebook, verifySocialAccount));

  return passport;
}

export default initAuth();
