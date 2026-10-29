import { createContext, useContext, useRef, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { CursorState } from '../lib/cursor'

type CursorSubscriber = (state: CursorState, label: string, magneticTarget: HTMLElement | null) => void

interface CursorContextType {
  setCursor: (state: CursorState, label?: string) => void
  resetCursor: () => void
  setMagneticTarget: (target: HTMLElement | null) => void
  subscribe: (subscriber: CursorSubscriber) => () => void
  getState: () => { state: CursorState; label: string; magneticTarget: HTMLElement | null }
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<CursorState>('default')
  const labelRef = useRef<string>('')
  const magneticTargetRef = useRef<HTMLElement | null>(null)
  const subscribersRef = useRef<Set<CursorSubscriber>>(new Set())

  const notify = useCallback(() => {
    subscribersRef.current.forEach((cb) =>
      cb(stateRef.current, labelRef.current, magneticTargetRef.current)
    )
  }, [])

  const setCursor = useCallback((state: CursorState, label = '') => {
    stateRef.current = state
    labelRef.current = label
    notify()
  }, [notify])

  const resetCursor = useCallback(() => {
    stateRef.current = 'default'
    labelRef.current = ''
    magneticTargetRef.current = null
    notify()
  }, [notify])

  const setMagneticTarget = useCallback((target: HTMLElement | null) => {
    magneticTargetRef.current = target
    if (target) {
      stateRef.current = 'magnetic'
    } else if (stateRef.current === 'magnetic') {
      stateRef.current = 'default'
    }
    notify()
  }, [notify])

  const subscribe = useCallback((subscriber: CursorSubscriber) => {
    subscribersRef.current.add(subscriber)
    // Emit current state immediately to new subscriber
    subscriber(stateRef.current, labelRef.current, magneticTargetRef.current)
    return () => {
      subscribersRef.current.delete(subscriber)
    }
  }, [])

  const getState = useCallback(() => ({
    state: stateRef.current,
    label: labelRef.current,
    magneticTarget: magneticTargetRef.current,
  }), [])

  return (
    <CursorContext.Provider value={{ setCursor, resetCursor, setMagneticTarget, subscribe, getState }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
