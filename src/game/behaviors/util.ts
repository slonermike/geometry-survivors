type ParamFunc<T> = (level: number) => T

export function evaluateScalableParam<T>(param: T | ParamFunc<T>, level: number): T {
  if (typeof param === 'function') {
    return (param as ParamFunc<T>)(level)
  }
  return param
}
