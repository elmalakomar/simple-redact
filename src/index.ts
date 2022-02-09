const example = {
  a: '1',
  b: '2',
  c: {
    d: '4',
    e: '5',
  },
}

const toMask = [
  { field: 'b', type: 'default' },
  {
    field: 'c',
    type: 'default',
    data: [{ field: 'd', type: 'default' }],
  },
]

const isObject = (data: any): Boolean => {
  return typeof data === 'object' && !Array.isArray(data) && data !== null
}

const redact = (obj: Record<string, any>, toRedact: any) => {
  const newObj = Object.assign({}, obj)
  const availableKeys = Object.keys(newObj)
  toRedact.forEach((bo: any) => {
    const fieldToManipulate = bo.field
    if (availableKeys.includes(fieldToManipulate)) {
      if (isObject(newObj[bo.field]) && bo.data) {
        newObj[bo.field] = redact(newObj[bo.field], bo.data)
        return
      }
      return (newObj[bo.field] = '[REDACT]')
    }
  })
  return newObj
}

console.log(example)
const x = redact(example, toMask)
console.log(x)
console.log(example)
