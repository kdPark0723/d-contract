import dbc = require('../lib');
const { validate, required } = dbc;

class Converter {
  @validate((result) => !isNaN(result))
  toNumber(@required((numeric) => !isNaN(numeric)) numeric: string) {
    return Number(numeric);
  }
}

const converter = new Converter();
console.log(converter.toNumber('1213'));
console.log(converter.toNumber('aaa'));
