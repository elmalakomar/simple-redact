import { buildConfig } from '../buildConfig'

describe('buildConfig', () => {
  it('should return correct configuration', () => {
    const simpleConfig = ['a', 'c', 'a.b.x']
    const config = buildConfig(simpleConfig)
    const expected = [
      { field: 'a', data: [{ field: 'b', data: [{ field: 'x', data: [] }] }] },
      { field: 'c', data: [] },
    ]
    expect(config).toStrictEqual(expected)
  })
})
