export = class ValidateKey {
  constructor(
    public callback: (result: any) => boolean,
    public message: string
  ) {
  }
}
