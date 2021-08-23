interface ICacheProvider {
  set(key: string, value: unknown): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  remove(key: string): Promise<void>;
  removeByPrefix(prefix: string): Promise<void>;
}

export default ICacheProvider;
