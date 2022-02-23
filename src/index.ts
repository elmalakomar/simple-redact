import { isObject } from './lib/utils'
import { buildConfig } from './lib/buildConfig'
import { ConfigRedact, SingleConfig } from './typings/ConfigRedact'

const internalRedact = (
  obj: Record<string, any>,
  toRedact: ConfigRedact,
  result: Record<string, any>
) => {
  const availableKeys = Object.keys(result)
  toRedact.forEach((fieldToRedact: SingleConfig) => {
    const fieldToManipulate = fieldToRedact.field
    if (availableKeys.includes(fieldToManipulate)) {
      if (
        isObject(result[fieldToRedact.field]) &&
        fieldToRedact.data &&
        fieldToRedact.data.length > 0
      ) {
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

export const redact = (obj: Record<string, any>, config: string[]) => {
  const result = JSON.parse(JSON.stringify(obj))
  const toRedact = buildConfig(config)
  internalRedact(obj, toRedact, result)
  return result
}
