export type CursorState =
  | 'default'
  | 'link'
  | 'view'
  | 'drag'
  | 'text'
  | 'hide'
  | 'magnetic'
  | 'menu'

export interface CursorConfig {
  dotSize: number
  ringDefaultSize: number
  ringLinkScale: number
  ringViewSize: number
  ringDragSize: number
  ringTextWidth: number
  ringTextHeight: number
  dotDuration: number
  ringDuration: number
  ease: string
  stretchMax: number
  stretchFactor: number
}

export const CURSOR_CONFIG: CursorConfig = {
  dotSize: 8,
  ringDefaultSize: 40,
  ringLinkScale: 1.8,
  ringViewSize: 90,
  ringDragSize: 80,
  ringTextWidth: 2,
  ringTextHeight: 24,
  dotDuration: 0.1,
  ringDuration: 0.6,
  ease: 'power3.out',
  stretchMax: 1.35,
  stretchFactor: 0.015,
}

export const EASING_TRANSITION = 'expo.out'

export const globalMousePosition = { x: -100, y: -100 }

