import React, { memo, ReactNode, ComponentProps, useRef, RefObject } from 'react'
import { useMergeRefs } from './useMergeRefs'
import { useOverlayScrollbar } from './useOverlayScrollbar'
import 'overlayscrollbars/styles/overlayscrollbars.css'

export type AsCProps<As extends React.ElementType = 'div'> = { as?: As } & ComponentProps<As>

export interface OverlayScrollbarProps extends AsCProps {
  children?: ReactNode
}

/**
 * 自己作为滚动容器
 */
export function OverlayScrollbar(props: OverlayScrollbarProps) {
  const { children, as = 'div', ref, ...asProps } = props

  const targetRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLElement>(null)
  const nextRef = useMergeRefs(ref as RefObject<HTMLElement>, targetRef)

  useOverlayScrollbar({ targetRef, viewportRef })

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
