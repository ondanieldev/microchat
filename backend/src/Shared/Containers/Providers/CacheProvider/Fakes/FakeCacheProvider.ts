import ICacheProvider from '../Models/ICacheProvider';

interface IClient {
  [ḱey: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
  private client: IClient = {};

  public async set(key: string, value: unknown): Promise<void> {
    this.client[key] = JSON.stringify(value);
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = await this.client[key];
    if (!data) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  public async remove(key: string): Promise<void> {
    delete this.client[key];
  }

  public async removeByPrefix(prefix: string): Promise<void> {
    Object.entries(this.client).forEach(([key, value]) => {
      if (value.startsWith(prefix)) {
        delete this.client[key];
      }
    });
  }
}

export default FakeCacheProvider;
