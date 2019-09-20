const initConfig = (): any => {
  const isProduction = (process.env.NODE_ENV === 'production');

  if (isProduction) {
    return {
      isProduction,
      db: process.env.MONGODB_URL,
      clientBaseUrl: process.env.clientBaseUrl,
      sessionSecret: process.env.sessionSecret,
      secretJWT: process.env.JWT_SECRET,
      maxAgeJWT: process.env.JWT_MAX_AGE,
      email: {
        service: process.env.service,
        emailUsername: process.env.emailUsername,
        emailPassword: process.env.emailPassword
      },
      cloudinary: {
        name: process.env.CLOUDINARY_NAME,
        key: process.env.CLOUDINARY_API_KEY,
        secret: process.env.CLOUDINARY_API_SECRET
      }
    }
  } else {
    return {
      isProduction,
      db: process.env.MONGODB_URL || 'mongodb://localhost:27017/EtherealRiver',
      clientBaseUrl: 'http://localhost:3000',
      sessionSecret: 'SECRET',
      secretJWT: 'UpFJfpWKYteH5rMHSxst',
      maxAgeJWT: 10080,
      email: {
        service: 'gmail',
        emailUsername: 'etherealriversupp@gmail.com',
        emailPassword: '123456qwe!'
      },
      cloudinary: {
        name: '',
        key: '',
        secret: ''
      }
    }
  }
};

export default initConfig();
