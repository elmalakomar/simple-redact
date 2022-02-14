const { redact } = require('../index')
describe('redact', () => {
  describe('simple objects', () => {
    const obj = { a: 'foo', b: 'bar' }
    it('should return correctly object redacted', () => {
      const fieldsToRedact = [{ field: 'a' }]
      const actual = redact(obj, fieldsToRedact)

      const expected = { a: '[REDACT]', b: 'bar' }
      expect(actual).toStrictEqual(expected)
    })

    it('should return not redacted object as fields in config are not present', () => {
      const fieldsToRedact = [{ field: 'c' }]
      const actual = redact(obj, fieldsToRedact)

      const expected = { a: 'foo', b: 'bar' }
      expect(actual).toStrictEqual(expected)
    })
  })
})
