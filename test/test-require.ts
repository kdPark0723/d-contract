import dbc = require('../lib');
const { validate, required } = dbc;

class A {
  @validate
  f(@required a: string) {
    console.log(a);
  }
}

const a = new A();
a.f(undefined);
a.f('aa');
