// eslint-disable-next-line no-unused-vars
import { MethodInfo } from '../method/method-info';

export = class ValidateKey {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    // eslint-disable-next-line no-unused-vars
    public callbacks: Array<(result: any, methodInfo: MethodInfo) => boolean>,
    // eslint-disable-next-line no-unused-vars
    public message: string,
    // eslint-disable-next-line no-empty-function
  ) {
  }
}
