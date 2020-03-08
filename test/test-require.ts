import dContract = require('../lib');
const { validate, required } = dContract;

class Converter {
  @validate((result) => typeof result === 'number')
  // eslint-disable-next-line class-methods-use-this,no-restricted-globals
  toNumber(@required((numeric) => !isNaN(numeric)) numeric: string): number {
    return Number(numeric);
  }
}

const converter = new Converter();
// eslint-disable-next-line no-console
console.log(converter.toNumber('1213'));
console.log(converter.toNumber('aaaa'));

