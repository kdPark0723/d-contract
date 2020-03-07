import "reflect-metadata";
import validateFunctionMap = require("./validate-function-map");

function createParameterValidateFunction(name: symbol, hook: (param: any) => any) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    validateFunctionMap.set(name, hook);

    const existingRequiredParameters: number[] = Reflect.getOwnMetadata(name, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(name, existingRequiredParameters, target, propertyKey);
  }
}

export = createParameterValidateFunction;
