export enum RedactMethod {
  REDACT = 'redact',
  MASK = 'mask',
}

export interface SingleConfig {
  field: string
  type?: RedactMethod
  data?: SingleConfig[]
}

export type ConfigRedact = SingleConfig[]
