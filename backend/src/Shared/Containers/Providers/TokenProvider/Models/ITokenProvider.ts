interface ITokenProvider {
  generate(subject: string): string;
}

export default ITokenProvider;
