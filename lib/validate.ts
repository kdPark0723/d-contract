import 'reflect-metadata';

import decoratorKeys = require('./decorator/decorator-keys');
import ParameterDecoratorCallback = require('./parameter/parameter-decorator-callback');

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
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

    return method.apply(this, arguments);
  };
}

export = validate;
