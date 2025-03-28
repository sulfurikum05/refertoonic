import dotenv from 'dotenv';
dotenv.config();

const config = {
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  PORT: process.env.PORT || 3040,
  ONE_WAY_HASH_SECRET: process.env.ONE_WAY_HASH_SECRET,
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG,
  CORS: process.env.CORS?.split(',') || '*',
  PSQL: {
    URL: process.env.PSQL_URL,
    PORT: process.env.PSQL_PORT,
    HOST: process.env.PSQL_HOST,
    USER: process.env.PSQL_USER,
    DATABASE: process.env.PSQL_DATABASE,
    PASSWORD: process.env.PSQL_PASSWORD
  },

  AUTH: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    ACCESS_TOKEN_ACTIVE_TIME: process.env.ACCESS_TOKEN_ACTIVE_TIME || '12h',
  },

  GOOGLE_CONFIG : {
     CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
     CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
     EMAIL : process.env.EMAIL,
     APP_PASSWORD : process.env.APP_PASSWORD
  },


  DOMAINS: {
    DOMAIN: process.env.DOMAIN
  },

  WALLET_CONNECT : {
    
  },

  PAYMENTS : {
    PAYMENTS_API_KEY: process.env.PAYMENTS_API_KEY
  }
};

export default config;
