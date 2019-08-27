const initConfig = (): any => {
  const isProduction = (process.env.NODE_ENV === 'production');

  if (isProduction) {
    return {
      isProduction,
      db: process.env.MONGODB_URL,
      sessionSecret: process.env.sessionSecret,
      secretJWT: process.env.JWT_SECRET,
      maxAgeJWT: process.env.JWT_MAX_AGE,
      facebook: {
        clientID: process.env.facebookClientID,
        clientSecret: process.env.facebookClientSecret,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos']
      }
    }
  } else {
    return {
      isProduction,
      db: process.env.MONGODB_URL || 'mongodb://localhost:27017/EtherealRiver',
      sessionSecret: 'SECRET',
      secretJWT: 'UpFJfpWKYteH5rMHSxst',
      maxAgeJWT: 10080,
      facebook: {
        clientID: process.env.facebookClientID || 123,
        clientSecret: process.env.facebookClientSecret || 'abc123',
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos']
      }
    }
  }
};

export default initConfig();
