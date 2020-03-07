import assert = require('./assert');

export = assert((param) => param !== undefined, 'Parameter Required.');
