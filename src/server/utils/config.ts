export default {
  isProduction: (process.env.NODE_ENV === 'production'),
  db: process.env.MONGODB_URL,
  secretJWT: process.env.JWT_SECRET,
  maxAgeJWT: Number(process.env.JWT_MAX_AGE),
  email: {
    service: process.env.EMAIL_SERVICE,
    emailUsername: process.env.EMAIL_USERNAME,
    emailPassword: process.env.EMAIL_PASSWORD
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET
  }
} as IConfig;

interface IConfig {
  isProduction: boolean;
  db: string;
  secretJWT: string;
  maxAgeJWT: number;
  email: {
    service: string;
    emailUsername: string;
    emailPassword: string;
  };
  cloudinary: {
    name: string;
    key: string;
    secret: string;
  };
}
