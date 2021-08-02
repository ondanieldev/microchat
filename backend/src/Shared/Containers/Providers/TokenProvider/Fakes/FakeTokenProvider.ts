import ITokenProvider from '../Models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public generate(subject: string): string {
    return `${subject}_token`;
  }
}

export default FakeTokenProvider;
