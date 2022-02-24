import { isObject } from './lib/utils'
import { buildConfig } from './lib/buildConfig'
import {
  ConfigRedact,
  RedactMethod,
  SingleConfig,
} from './typings/ConfigRedact'

export default class Redacter {
  private redactMethod: RedactMethod

  constructor(redactMethod: RedactMethod = RedactMethod.REDACT) {
    this.redactMethod = redactMethod
  }

  private applyRedactMethod(fieldToRedact: any, method?: RedactMethod) {
    fieldToRedact = String(fieldToRedact)
    const methodToApply = method ? method : this.redactMethod
    if (methodToApply === RedactMethod.MASK) {
      return '*'.repeat(fieldToRedact.length)
    }
    if (methodToApply === RedactMethod.REDACT) {
      return '[REDACT]'
    }
  }

  private internalRedact = (
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
          this.internalRedact(
            obj[fieldToRedact.field],
            fieldToRedact.data,
            result[fieldToRedact.field]
          )
          return
        }
        result[fieldToRedact.field] = this.applyRedactMethod(
          result[fieldToRedact.field],
          fieldToRedact.type
        )
        return
      }
    })
    return
  }

  public simpleRedact = (obj: Record<string, any>, config: string[]) => {
    const result = JSON.parse(JSON.stringify(obj))
    const toRedact = buildConfig(config)
    this.internalRedact(obj, toRedact, result)
    return result
  }

  public redact = (obj: Record<string, any>, config: ConfigRedact) => {
    const result = JSON.parse(JSON.stringify(obj))
    this.internalRedact(obj, config, result)
    return result
  }
}
