import { OverlayScrollbars, Options, EventListeners } from 'overlayscrollbars'
import { RefObject, useEffect, useRef } from 'react'

export interface UseOverlayScrollbarOptions {
  targetRef: RefObject<HTMLElement>
  viewportRef?: RefObject<HTMLElement>

  options?: Options
  eventListeners?: EventListeners
}

export function useOverlayScrollbar(opts: UseOverlayScrollbarOptions) {
  const { targetRef, viewportRef, options = {}, eventListeners = {} } = opts
  const instanceRef = useRef<OverlayScrollbars | null>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return
    instanceRef.current = OverlayScrollbars(
      {
        target: target,
        elements: viewportRef ? { viewport: viewportRef.current } : undefined,
      },
      options,
      eventListeners,
    )
    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [targetRef.current, viewportRef?.current])

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.options(options)
      instanceRef.current.update()
    }
  }, [options])

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.on(eventListeners, true)
    }
  }, [eventListeners])

  return instanceRef
}
