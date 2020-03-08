import 'reflect-metadata';
// eslint-disable-next-line no-unused-vars
import { ParameterInfo } from './parameter-info';
// eslint-disable-next-line no-unused-vars
import { ParameterDecoratorCallback } from './parameter-decorator-callback';

import decoratorKeys = require('../decorator/decorator-keys');

// eslint-disable-next-line max-len
export = (name: symbol, callback: (param: any, info: ParameterInfo) => any) => (target: Object, key: string | symbol, index: number) => {
  decoratorKeys.add(name);

  // eslint-disable-next-line max-len
  const existingParameterDecoratorCallbacks: ParameterDecoratorCallback[] = Reflect.getOwnMetadata(name, target, key) || [];
  existingParameterDecoratorCallbacks.push({ info: { target, key, index }, callback });
  Reflect.defineMetadata(name, existingParameterDecoratorCallbacks, target, key);
};
