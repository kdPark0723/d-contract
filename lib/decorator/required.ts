import createParameterValidateFunction = require("../create-parameter-validate-function");
import assert = require("assert");

export = createParameterValidateFunction(Symbol("required"), (param => assert(param !== undefined)));
