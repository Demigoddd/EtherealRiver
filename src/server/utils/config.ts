const initConfig = (): any => {
  const isProduction = (process.env.NODE_ENV === 'production');

  if (isProduction) {
    return {
      isProduction,
      db: process.env.MONGODB_URL,
      baseUrl: process.env.baseUrl,
      sessionSecret: process.env.sessionSecret,
      secretJWT: process.env.JWT_SECRET,
      maxAgeJWT: process.env.JWT_MAX_AGE,
      email: {
        service: process.env.service,
        emailUsername: process.env.emailUsername,
        emailPassword: process.env.emailPassword
      },
      google: {
        clientID: process.env.facebookClientID,
        clientSecret: process.env.facebookClientSecret,
        callbackURL: '/user/google/callback',
        passReqToCallback: true
      },
      facebook: {
        clientID: process.env.facebookClientID,
        clientSecret: process.env.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos']
      }
    }
  } else {
    return {
      isProduction,
      db: process.env.MONGODB_URL || 'mongodb://localhost:27017/EtherealRiver',
      baseUrl: 'http://localhost:3000',
      sessionSecret: 'SECRET',
      secretJWT: 'UpFJfpWKYteH5rMHSxst',
      maxAgeJWT: 10080,
      email: {
        service: 'gmail',
        emailUsername: 'etherealriversupp@gmail.com',
        emailPassword: '123456qwe!'
      },
      google: {
        clientID: '91060208258-vu7ji6pjn39ge5c6c3lpup2d8o7og2un.apps.googleusercontent.com',
        clientSecret: '8TjhvLWmYRM-IoR6pijvV51i',
        callbackURL: '/user/google/callback',
        passReqToCallback: true
      },
      facebook: {
        clientID: process.env.facebookClientID || 123,
        clientSecret: process.env.facebookClientSecret || 'abc123',
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos']
      }
    }
  }
};

export default initConfig();
