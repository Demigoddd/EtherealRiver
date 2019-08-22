const initConfig = (): any => {
  const isProduction = (process.env.NODE_ENV === 'production');

  if (isProduction) {
    return {
      isProduction,
      db: process.env.MONGODB_URL,
      sessionSecret: process.env.sessionSecret,
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
