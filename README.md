# d-contract

![](https://img.shields.io/npm/dm/d-contract.png?style=flat-square)

For Support, Design by Contract(DBC)

​    

## Use

```typescript
import dContract = require('d-contract');
const { validate, required } = dContract;

class Converter {
  @validate((result) => typeof result === 'number')
  toNumber(@required((numeric) => !isNaN(numeric)) numeric: string) {
    return Number(numeric);
  }
}

const converter = new Converter();
console.log(converter.toNumber('1213'));
console.log(converter.toNumber('aaa')); // throw assert error
```

