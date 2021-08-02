interface ITokenConfig {
  secret: string;
  expiresIn: string;
}

export default {
  secret: process.env.TOKEN_SECRET || '',
  expiresIn: '1d',
} as ITokenConfig;
