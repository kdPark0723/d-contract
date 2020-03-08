// eslint-disable-next-line no-unused-vars
import { MethodInfo } from '../method/method-info';

import assert = require('assert');

export = async (
  promise,
  validate: (result: any, methodInfo?: MethodInfo) => boolean = null,
  methodInfo?: MethodInfo,
  message: string = undefined,
): Promise<any> => {
  if (!validate) return promise;

  const result = await promise;
  assert(validate(result, methodInfo), message);
  return result;
}
