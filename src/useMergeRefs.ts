import { MutableRefObject, useCallback } from 'react'

export type MutableRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null

export function useMergeRefs<T>(...refs: Array<MutableRef<T> | undefined>) {
  return useCallback((v: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return
      if (typeof ref === 'function') {
        ref(v)
      } else {
        ref.current = v
      }
    })
  }, [])
}
