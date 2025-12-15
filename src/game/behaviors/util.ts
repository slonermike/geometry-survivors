import type { ILeveledEntity } from '../entities/ILeveledEntity'

type ParamFunc<T> = (level: number) => T
export type ScalableParam<T> = T | ((level: number) => T)

export function evaluateScalableParam<T>(
  param: T | ParamFunc<T>,
  levelSource: ILeveledEntity | number
): T {
  const level = typeof levelSource === 'number' ? levelSource : levelSource.getLevel()
  if (typeof param === 'function') {
    return (param as ParamFunc<T>)(level)
  }
  return param
}
