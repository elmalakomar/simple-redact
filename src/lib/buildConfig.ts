import { ConfigRedact, SingleConfig } from '../typings/ConfigRedact'

const separator = '.'
export const buildConfig = (config: string[]) => {
  const result: ConfigRedact = []
  config.forEach((field) => {
    let splittedField = [field]
    if (field.includes(separator)) {
      splittedField = field.split(separator)
    }
    buildFieldConfig(splittedField, result)
  })
  return result
}

const buildFieldConfig = (
  splittedField: string[],
  result: ConfigRedact,
  index = 0
) => {
  if (index >= splittedField.length) {
    return
  }
  let simpleFieldConfig = result.find((x) => x.field === splittedField[index])
  if (!simpleFieldConfig) {
    const configToAdd: SingleConfig = {
      field: splittedField[index],
      data: [],
    }
    const configIndex = result.push(configToAdd) - 1
    buildFieldConfig(
      splittedField,
      result[configIndex].data as ConfigRedact,
      index + 1
    )
    return
  }
  buildFieldConfig(
    splittedField,
    simpleFieldConfig.data as ConfigRedact,
    index + 1
  )
  return
}
