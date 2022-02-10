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

export const toMask = [
  { field: 'b', type: 'default' },
  {
    field: 'c',
    type: 'default',
    data: [
      { field: 'd', type: 'default' },
      { field: 'f', type: 'default', data: [{ field: 'g', type: 'default' }] },
    ],
  },
]
