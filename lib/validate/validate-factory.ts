import 'reflect-metadata';

import validate = require('./validate');
import ValidateKey = require('./validate-key');
import combineValidateFunctions = require('./conbine-validate-functions');

const validateMap = new Map();

const defaultValidate = validate();

// eslint-disable-next-line max-len
export = function validateFactory(...postConditions) {
  let message = null;
  if (typeof postConditions[postConditions.length - 1] === 'string') {
    message = postConditions.pop();
  }
  if (postConditions.length === 0 && !message) return defaultValidate;

  const key = new ValidateKey(postConditions, message);
  const postCondition = combineValidateFunctions(postConditions);
  if (!validateMap.has(key)) validateMap.set(key, validate(postCondition, message));
  return validateMap.get(key);
};
