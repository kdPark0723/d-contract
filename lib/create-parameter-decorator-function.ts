import "reflect-metadata";
import decoratorKeys = require("./decorator-keys");
import ParameterInfo = require("./parameter-info");
import ParameterDecoratorCallback = require("./parameter-decorator-callback");

function createParameterDecoratorFunction(name: symbol, callback: (param: any, info: ParameterInfo) => any) {
  return function (target: Object, key: string | symbol, index: number) {
    decoratorKeys.add(name);

    const existingParameterDecoratorCallbacks: ParameterDecoratorCallback[] = Reflect.getOwnMetadata(name, target, key) || [];
    existingParameterDecoratorCallbacks.push({ info: { target, key, index }, callback });
    Reflect.defineMetadata(name, existingParameterDecoratorCallbacks, target, key);
  }
}

export = createParameterDecoratorFunction;
