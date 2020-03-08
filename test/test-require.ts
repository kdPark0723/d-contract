import dContract = require('../lib');
const { validate, required } = dContract;

class Converter {
  @validate((result) => typeof result === 'number')
  toNumber(@required((numeric) => !isNaN(numeric)) numeric: string) {
    return Number(numeric);
  }
}

const converter = new Converter();
console.log(converter.toNumber('1213'));
console.log(converter.toNumber('aaa'));
