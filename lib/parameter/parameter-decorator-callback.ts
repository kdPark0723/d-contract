import ParameterInfo = require('./parameter-info');

interface ParameterDecoratorCallback {
  info: ParameterInfo, callback: (param: any, info: ParameterInfo) => any
}

export = ParameterDecoratorCallback;
