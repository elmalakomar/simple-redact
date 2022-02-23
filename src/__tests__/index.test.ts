import { redact } from '../index'

describe('redact', () => {
  describe('simple objects', () => {
    const obj = { a: 'foo', b: 'bar' }
    it('should return correctly object redacted', () => {
      const fieldsToRedact = ['a']
      const actual = redact(obj, fieldsToRedact)

      const expected = { a: '[REDACT]', b: 'bar' }
      expect(actual).toStrictEqual(expected)
    })

    it('should return not redacted object as fields in config are not present', () => {
      const fieldsToRedact = ['c']
      const actual = redact(obj, fieldsToRedact)

      const expected = { a: 'foo', b: 'bar' }
      expect(actual).toStrictEqual(expected)
    })
  })

  describe('nested objects', () => {
    const obj = { a: 'a', b: 'b', c: { d: 'd' } }
    it('should redact field in nested objects', () => {
      const toRedact = ['a', 'c.d']
      const actual = redact(obj, toRedact)
      expect(actual).toStrictEqual({
        a: '[REDACT]',
        b: 'b',
        c: { d: '[REDACT]' },
      })
    })

    it('should redact nested object', () => {
      const toRedact = ['a', 'c']
      const actual = redact(obj, toRedact)
      expect(actual).toStrictEqual({
        a: '[REDACT]',
        b: 'b',
        c: '[REDACT]',
      })
    })
  })
})
