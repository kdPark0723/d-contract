// eslint-disable-next-line no-unused-vars
import { ParameterInfo } from '../parameter/parameter-info';

export = class RequiredKey {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    // eslint-disable-next-line no-unused-vars
    public callback: (param: any, info: ParameterInfo) => boolean,
    // eslint-disable-next-line no-unused-vars
    public message: string,
    // eslint-disable-next-line no-empty-function
  ) {
  }
}
