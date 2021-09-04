interface ILocalStorageConfig {
  userKey: string;
}

const LocalStorageConfig = {
  userKey: '@MICROCHAT:USER',
} as ILocalStorageConfig;

export default LocalStorageConfig;
