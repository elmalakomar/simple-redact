# simple-redact

library with function that redacts specified fields inside json object

### How it works

The library exposes a single function `redact` that takes 2 arguments. The object to redact and an array describing which are the fields to redact and how.

### Example

```
const { redact } = require('simple-redact')

const toRedact = { a: 'bar', b: 'foo', c: { d: 'pluto'} }
const config = [ 'a', 'c.d' ]
const redacted = redact(toRedact, config)
console.log(redacted) // { a: '[REDACT]', b: 'foo', c: { d: '[REDACT]' } }
```

### TODO:

- Make easier to describe the fields to redact
- Support simple types
- Make better documentation with better examples
- Support multiple ways to redact the values (e.g. masking)

### Note:

The first 'working' version of the lib is v0.1.3
