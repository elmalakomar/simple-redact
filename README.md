# simple-redact

library with function that redacts specified fields inside json object

### How it works

The library exposes a class `Redacter` that has functions `redact` and `simpleRedact` that takes 2 arguments: the object to redact and an array describing which are the fields to redact and how.

The constructor of the class takes as parameter the preferred method to redact. There are two possible methods:

1. "mask": mask the field with `*` of the same length. E.g. 'pippo' -> `*****`
2. "redact" (the default way): substitute the field with the following string '[REDACT]'

### Example

##### simpleRedact

```
const Redacter = require('simple-redact')

const redacter = new Redacter()

const toRedact = { a: 'bar', b: 'foo', c: { d: 'pluto'} }
const config = [ 'a', 'c.d' ]
const redacted = redacter.simpleRedact(toRedact, config)
console.log(redacted) // { a: '[REDACT]', b: 'foo', c: { d: '[REDACT]' } }
```

##### redact

```
const Redacter = require('simple-redact')

const redacter = new Redacter()

const toRedact = { a: 'bar', b: 'foo', c: { d: 'pluto'} }
const config = [
    { field: 'a' },
    { field: 'c', data: [ { field: 'd' } ] },
  ]
const redacted = redacter.redact(toRedact, config)
console.log(redacted) // { a: '[REDACT]', b: 'foo', c: { d: '[REDACT]' } }
```

### TODO:

- Make easier to describe the fields to redact
- Support simple types
- Make better documentation with better examples
- Support multiple ways to redact the values (e.g. masking)

### Note:

The first 'working' version of the lib is v0.1.3
