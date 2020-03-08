// eslint-disable-next-line no-unused-vars
import { MethodInfo } from '../method/method-info';

// eslint-disable-next-line max-len
export = function combineValidateFunctions(functions: Array<(_: any, methodInfo?: MethodInfo) => boolean> = []): (_: any) => boolean {
  return function validateFunction(arg: any, methodInfo?: MethodInfo): boolean {
    let pass = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const func of functions) {
      if (!pass) return false;
      pass = pass && func(arg, methodInfo);
    }

    return true;
  };
}
