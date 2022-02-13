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

enum Type {
  REDACT = 'redact',
  MASK = 'mask',
}

export interface SingleConfig {
  field: string
  type?: Type
  data?: SingleConfig[]
}

export type ConfigRedact = SingleConfig[]

export const toMask: ConfigRedact = [
  { field: 'b', type: Type.REDACT },
  {
    field: 'c',
    type: Type.REDACT,
    data: [
      { field: 'd', type: Type.MASK },
      { field: 'f', type: Type.MASK, data: [{ field: 'g' }] },
    ],
  },
]
