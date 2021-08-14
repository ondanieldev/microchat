interface IHashConfig {
  provider: 'argon2';
}

export default {
  provider: process.env.HASH_PROVIDER,
} as IHashConfig;
