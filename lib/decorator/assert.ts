import createParameterDecoratorFunction = require('../parameter/create-parameter-decorator-function');
import ParameterInfo = require('../parameter/parameter-info');
import assert = require('assert');

export = function (callback: (param: any, info: ParameterInfo) => boolean, message: string) {
  return createParameterDecoratorFunction(Symbol(), ((param, info) => {
    const value = callback(param, info);
    const localMessage = `[${info.target.constructor.name || JSON.stringify(info.target)}.${info.key.toString()}:${info.index}] ${param}, ${message}`;
    return assert(value, localMessage);
  }))
};
