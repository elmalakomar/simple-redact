import { ConfigRedact, SingleConfig } from "./example/simple"

const isObject = (data: any): Boolean => {
  return typeof data === 'object' && !Array.isArray(data) && data !== null
}

const redact = (obj: Record<string, any>, toRedact: ConfigRedact) => {
  const result = JSON.parse(JSON.stringify(obj))

  const internalRedact = (
    obj: Record<string, any>,
    toRedact: any,
    result: Record<string, any>
  ) => {
    const availableKeys = Object.keys(result)
    toRedact.forEach((bo: SingleConfig) => {
      const fieldToManipulate = bo.field
      if (availableKeys.includes(fieldToManipulate)) {
        if (isObject(result[bo.field]) && bo.data) {
          internalRedact(obj[bo.field], bo.data, result[bo.field])
          return
        }
        return (result[bo.field] = '[REDACT]')
      }
    })
    return
  }
  internalRedact(obj, toRedact, result)
  return result
}
