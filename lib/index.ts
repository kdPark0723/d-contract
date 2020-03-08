import validate = require('./validate');
import validateFunction = require('./validate-function');
import decorator = require('./decorator');
import parameter = require('./parameter');

export = {
  ...validate, ...validateFunction, ...decorator, ...parameter,
};
