// eslint-disable-next-line no-unused-vars
import { MethodInfo } from '../method/method-info';

export = function validateResponseType(value: any, methodInfo: MethodInfo) {
  const type = Reflect.getMetadata('design:type', methodInfo.target, methodInfo.propertyName);
  return value instanceof type;
}
