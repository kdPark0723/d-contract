import assert = require('assert');

export = async function runAndValidatePromise<T>(
  promise: Promise<T>,
  validate: (result: T) => boolean = null,
  message: string = undefined
): Promise<T> {
  if (!validate) return promise;

  const result = await promise;
  assert(validate(result), message);
  return result;
}
