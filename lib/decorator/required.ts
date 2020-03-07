import createParameterDecoratorFunction = require('../parameter/create-parameter-decorator-function');
import assert = require('assert');

export = createParameterDecoratorFunction(Symbol('required'), ((param, info) => {
  const message = `[${JSON.stringify(info.target)}:${info.key.toString()}:${info.index}] ${param} !== undefined`;
  return assert(param !== undefined, message);
}));
