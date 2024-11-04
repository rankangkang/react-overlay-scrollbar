import React, { memo, ReactNode, ComponentProps, useRef, RefObject, ElementType, useMemo } from 'react'
import { useMergeRefs } from './useMergeRefs'
import { useOverlayScrollbar, UseOverlayScrollbarOptions } from './useOverlayScrollbar'
import 'overlayscrollbars/styles/overlayscrollbars.css'

export type OverlayScrollbarProps<As extends ElementType> = {
  as?: As
  scrollOptions?: Pick<UseOverlayScrollbarOptions, 'options' | 'eventListeners'>

  children?: ReactNode
} & Omit<ComponentProps<As>, 'children'>

/**
 * 自己作为滚动容器
 */
export function OverlayScrollbar<As extends ElementType>(props: OverlayScrollbarProps<As>) {
  const { children, as = 'div', ref, scrollOptions, ...asProps } = props

  const targetRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLElement>(null)
  const nextRef = useMergeRefs(ref as RefObject<HTMLElement>, targetRef)

  useOverlayScrollbar(useMemo(() => ({ targetRef, viewportRef, ...scrollOptions }), [scrollOptions]))

  return React.createElement(
    as,
    {
      ...asProps,
      ref: nextRef,
    },
    React.isValidElement(children)
      ? React.cloneElement(children, {
          ...children.props,
          ref: viewportRef,
        })
      : children,
  )
}
