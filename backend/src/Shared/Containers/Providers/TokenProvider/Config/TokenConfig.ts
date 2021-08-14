interface ITokenConfig {
  provider: 'jwt';
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default {
  provider: process.env.TOKEN_PROVIDER,
  jwt: {
    secret: process.env.TOKEN_JWT_SECRET || '',
    expiresIn: '1d',
  },
} as ITokenConfig;
