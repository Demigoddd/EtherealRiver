import passport from 'passport';
import config from '../utils/config';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { UserModel } from '../models';

passport.use(new GoogleStrategy(config.google, (accessToken: any, refreshToken: any, profile: any, done: any) => {
  const email = profile.emails[0].value;

  // check if user already exists
  UserModel.findOne({socialId: profile.id}, (err: any, user: any) => {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, user);
    } else {
      new UserModel({email: email, fullname: profile.displayName, socialId: profile.id}).save()
        .then((obj: any) => {
          return done(null, obj);
        })
        .catch((err: any) => {
          return done(err);
        });
    }
  });
}));
