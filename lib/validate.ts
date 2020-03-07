import "reflect-metadata";
import validateFunctionMap = require("./validate-function-map");

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value;
  descriptor.value = function () {
    const metadataKeys: IterableIterator<any> = validateFunctionMap.keys();
    for (let key of metadataKeys) {
      const parametersIndex: number[] = Reflect.getOwnMetadata(key, target, propertyName);
      const validateFunction: Function = validateFunctionMap.get(key);

      if (parametersIndex) {
        for (let parameterIndex of parametersIndex) {
          validateFunction(arguments[parameterIndex]);
        }
      }
    }

    return method.apply(this, arguments);
  }
}

export = validate;
