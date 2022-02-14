import { isObject } from './lib/utils'
import { ConfigRedact, SingleConfig } from './typings/ConfigRedact'

export const redact = (obj: Record<string, any>, toRedact: ConfigRedact) => {
  const result = JSON.parse(JSON.stringify(obj))

  const internalRedact = (
    obj: Record<string, any>,
    toRedact: ConfigRedact,
    result: Record<string, any>
  ) => {
    const availableKeys = Object.keys(result)
    toRedact.forEach((fieldToRedact: SingleConfig) => {
      const fieldToManipulate = fieldToRedact.field
      if (availableKeys.includes(fieldToManipulate)) {
        if (isObject(result[fieldToRedact.field]) && fieldToRedact.data) {
          internalRedact(
            obj[fieldToRedact.field],
            fieldToRedact.data,
            result[fieldToRedact.field]
          )
          return
        }
        return (result[fieldToRedact.field] = '[REDACT]')
      }
    })
    return
  }
  internalRedact(obj, toRedact, result)
  return result
}
