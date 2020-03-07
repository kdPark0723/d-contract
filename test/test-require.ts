import validate = require("../lib/validate");
import required = require("../lib/decorator/required");

class A {
  @validate
  f(@required a: string) {
    console.log(a);
  }
}

const a = new A();
a.f(undefined);
a.f("aa");
