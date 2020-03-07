import 'reflect-metadata';
import assert = require('assert');

import decoratorKeys = require('./decorator/decorator-keys');
import ParameterDecoratorCallback = require('./parameter/parameter-decorator-callback');

const validateMap = new Map();

class ValidateKey {
  constructor(
    public callback: (result: any) => boolean,
    public message: string
  ) {
  }
}

async function runAndValidatePromise(promise: Promise<any>, validate: (result: any) => boolean = null, message: string = undefined): Promise<any> {
  if (!validate) return promise;

  const result = await promise;
  assert(validate(result), message);
  return result;
}

function validate(postCondition: (result: any) => boolean = null, message: string = undefined) {
  return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    const method = descriptor.value;
    descriptor.value = function () {
      const metadataKeys: IterableIterator<any> = decoratorKeys.keys();
      for (const key of metadataKeys) {
        const ParameterDecoratorCallbacks: ParameterDecoratorCallback[] = Reflect.getOwnMetadata(key, target, propertyName);

        if (ParameterDecoratorCallbacks) {
          for (const callbackInfo of ParameterDecoratorCallbacks) {
            callbackInfo.callback(arguments[callbackInfo.info.index], callbackInfo.info);
          }
        }
      }

      let result = method.apply(this, arguments);
      if (postCondition) {
        if (result instanceof Promise) result = runAndValidatePromise(result, postCondition, message);
        else assert(postCondition(result), message);
      }

      return result;
    };
  }
}

const defaultValidate = validate();

export = function (postCondition: (result: any) => boolean = null, message: string = undefined) {
  if (!postCondition && !message) return defaultValidate;

  const key = new ValidateKey(postCondition, message);
  if (!validateMap.has(key)) return validateMap.set(key, validate(postCondition, message));
  return validateMap.get(key);
};
