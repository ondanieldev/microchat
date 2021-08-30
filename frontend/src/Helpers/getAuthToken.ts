import LocalStorageConfig from 'Config/LocalStorageConfig';

const getAuthToken = (): string | null => {
  const user = localStorage.getItem(LocalStorageConfig.userKey);
  if (!user) return null;
  return JSON.parse(user).token;
};

export default getAuthToken;
