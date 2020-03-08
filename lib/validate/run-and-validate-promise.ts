import assert = require('assert');

export = async (
  promise,
  validate: (result: any) => boolean = null,
  message: string = undefined,
): Promise<any> => {
  if (!validate) return promise;

  const result = await promise;
  assert(validate(result), message);
  return result;
}
