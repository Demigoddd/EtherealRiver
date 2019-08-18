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
      db: process.env.MONGODB_URL || 'mongodb+srv://GOD:Torrent098@etherealriver-beyem.mongodb.net/test?retryWrites=true&w=majority',
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
