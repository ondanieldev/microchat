import IHashProvider from '../Models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generate(payload: string): Promise<string> {
    return `${payload}_hash`;
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return `${payload}_hash` === hashed;
  }
}

export default FakeHashProvider;
