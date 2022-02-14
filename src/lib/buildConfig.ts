
import { ConfigRedact } from '../typings/ConfigRedact'

export const buildConfig = (config: string[]) => {
  const result: ConfigRedact = []
  config.forEach(field => {
    const fieldConfig = result.find(simpleConfig => simpleConfig.field === field)
    if(!fieldConfig) {
      result.push({ field })
    }
  });
  return result
}

const strings = ['a', 'c','a']
const config = buildConfig(strings)
console.log(config)

