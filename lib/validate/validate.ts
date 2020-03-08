import 'reflect-metadata';

import assert = require('assert');

import decoratorKeys = require('../decorator/decorator-keys');
import ValidateKey = require('./validate-key');
import runAndValidatePromise = require('./run-and-validate-promise');

const validateMap = new Map();

function validate(postCondition: (result: any) => boolean = null, message: string = undefined) {
  return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = () => {
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
      if (postCondition) {
        if (result instanceof Promise) {
          result = runAndValidatePromise(result, postCondition, message);
        } else assert(postCondition(result), message);
      }

      return result;
    };
  };
}

const defaultValidate = validate();

export = (postCondition: (result: any) => boolean = null, message: string = undefined) => {
  if (!postCondition && !message) return defaultValidate;

  const key = new ValidateKey(postCondition, message);
  if (!validateMap.has(key)) validateMap.set(key, validate(postCondition, message));
  return validateMap.get(key);
};
