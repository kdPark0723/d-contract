// eslint-disable-next-line no-unused-vars
import { MethodInfo } from '../method/method-info';

import assert = require('assert');

import decoratorKeys = require('../decorator/decorator-keys');
import runAndValidatePromise = require('./run-and-validate-promise');

// eslint-disable-next-line max-len
export = function validate(postCondition: (result: any, methodInfo?: MethodInfo) => boolean = null, message: string = undefined) {
  return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign,func-names
    descriptor.value = function () {
      const metadataKeys: IterableIterator<any> = decoratorKeys.keys();
      // eslint-disable-next-line no-restricted-syntax
      for (const key of metadataKeys) {
        const ParameterDecoratorCallbacks = Reflect.getOwnMetadata(key, target, propertyName);

        if (ParameterDecoratorCallbacks) {
          // eslint-disable-next-line no-restricted-syntax
          for (const callbackInfo of ParameterDecoratorCallbacks) {
            // eslint-disable-next-line prefer-rest-params
            callbackInfo.callback(arguments[callbackInfo.info.index], callbackInfo.info);
          }
        }
      }

      // eslint-disable-next-line prefer-rest-params
      let result = method.apply(this, arguments);
      const methodInfo = { target, propertyName, descriptor };
      if (postCondition) {
        if (result instanceof Promise) {
          // eslint-disable-next-line max-len
          result = runAndValidatePromise(result, postCondition, methodInfo, message);
        } else assert(postCondition(result, methodInfo), message);
      }

      return result;
    };
  };
}
