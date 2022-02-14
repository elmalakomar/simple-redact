import { ConfigRedact, RedactMethod } from '../typings/ConfigRedact'

export const example = {
  a: '1',
  b: '2',
  c: {
    d: '4',
    e: '5',
    f: {
      g: '6',
    },
  },
}

export const toMask: ConfigRedact = [
  { field: 'b', type: RedactMethod.REDACT },
  {
    field: 'c',
    type: RedactMethod.REDACT,
    data: [
      { field: 'd', type: RedactMethod.MASK },
      { field: 'f', type: RedactMethod.MASK, data: [{ field: 'g' }] },
    ],
  },
]
