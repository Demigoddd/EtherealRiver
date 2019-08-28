import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import config from '../utils/config';
import { UserCtrl } from "../controllers";

const verifySocialAccount = (token: any, tokenSecret: any, profile: any, done: any) => {
  UserCtrl.findOrCreate({ googleId: profile.id }, (err: any, user: any) => {
    return done(err, user);
  });
};

passport.use(new GoogleStrategy(config.google, verifySocialAccount));
