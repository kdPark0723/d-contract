import assert = require('./assert');
import ParameterInfo = require("../parameter/parameter-info");

const requiredMap = new Map();

class RequiredKey {
  constructor(
    public callback: (param: any, info: ParameterInfo) => boolean,
    public message: string
  ) {
  }
}

const defaultRequired = assert((param) => param !== undefined, 'Parameter Required.');

export = function (callback: (param: any, info: ParameterInfo) => boolean = null, message: string = undefined) {
  if (!callback && !message) return defaultRequired;

  const key = new RequiredKey(callback, message);
  if (!requiredMap.has(key)) requiredMap.set(key, assert(callback, message));
  return requiredMap.get(key);
};
