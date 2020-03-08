// eslint-disable-next-line no-unused-vars
import { ParameterInfo } from './parameter-info';

export interface ParameterDecoratorCallback {
  info: ParameterInfo, callback: (param: any, info: ParameterInfo) => any
}
