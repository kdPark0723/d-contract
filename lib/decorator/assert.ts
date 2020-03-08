// eslint-disable-next-line no-unused-vars
import { ParameterInfo } from '../parameter/parameter-info';

import createParameterDecoratorFunction = require('../parameter/create-parameter-decorator-function');
import assert = require('assert');

// eslint-disable-next-line max-len
export = (callback: (param: any, info: ParameterInfo) => boolean, message: string) => createParameterDecoratorFunction(
  // eslint-disable-next-line symbol-description
  Symbol(),
  ((param, info) => {
    const value = callback(param, info);
    const localMessage = `[${info.target.constructor.name || JSON.stringify(info.target)}.${info.key.toString()}:${info.index}] ${param}, ${message}`;
    return assert(value, localMessage);
  }),
);
