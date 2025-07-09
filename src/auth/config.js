import dotenv from 'dotenv';
dotenv.config();

export default {
  google: {
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    packageName: process.env.GOOGLE_PACKAGE_NAME,
  },
};
