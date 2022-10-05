type FN = (...args: any[]) => void
export function debounce<T extends FN>(fn: T, delay: number = 300)
:(...args: Parameters<T>) => ReturnType<T>
 {
  return (...args: any[]) => {
    let I: any = null, returnValue: any
    I && clearTimeout(I)
    I = setTimeout(() => {
      returnValue = fn(...args)
    }, delay)
    return returnValue
  }
}