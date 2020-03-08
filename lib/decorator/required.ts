// eslint-disable-next-line no-unused-vars
import { ParameterInfo } from '../parameter/parameter-info';

import assert = require('./assert');
import RequiredKey = require('./required-key');

const requiredMap = new Map();

const defaultRequired = assert((param) => param !== undefined, 'Parameter Required.');

// eslint-disable-next-line max-len
export = function required(callback: (param: any, info: ParameterInfo) => boolean = null, message: string = undefined) {
  if (!callback && !message) return defaultRequired;

  const key = new RequiredKey(callback, message);
  if (!requiredMap.has(key)) requiredMap.set(key, assert(callback, message));
  return requiredMap.get(key);
};
