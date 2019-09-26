const initConfig = (): any => {
  const isProduction = (process.env.NODE_ENV === 'production');

  if (isProduction) {
    return {
      isProduction,
      db: process.env.MONGODB_URL,
      secretJWT: process.env.JWT_SECRET,
      maxAgeJWT: Number(process.env.JWT_MAX_AGE),
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
      secretJWT: 'UpFJfpWKYteH5rMHSxst',
      maxAgeJWT: 21600,
      email: {
        service: 'gmail',
        emailUsername: 'etherealriversupp@gmail.com',
        emailPassword: '123456qwe!'
      },
      cloudinary: {
        name: 'dgfmy2vas',
        key: '569193638815932',
        secret: 'G9ZW9WssqUOtT1zrTogju--RHog'
      }
    }
  }
};

export default initConfig();
