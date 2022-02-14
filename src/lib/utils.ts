export const isObject = (data: any): Boolean => {
  return typeof data === 'object' && !Array.isArray(data) && data !== null
}
