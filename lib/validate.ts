import "reflect-metadata";
import decoratorKeys = require("./decorator-keys");
import ParameterDecoratorCallback = require("./parameter-decorator-callback");

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value;
  descriptor.value = function () {
    const metadataKeys: IterableIterator<any> = decoratorKeys.keys();
    for (let key of metadataKeys) {
      const ParameterDecoratorCallbacks: ParameterDecoratorCallback[] = Reflect.getOwnMetadata(key, target, propertyName);

      if (ParameterDecoratorCallbacks) {
        for (let callbackInfo of ParameterDecoratorCallbacks) {
          callbackInfo.callback(arguments[callbackInfo.info.index], callbackInfo.info);
        }
      }
    }

    return method.apply(this, arguments);
  }
}

export = validate;
