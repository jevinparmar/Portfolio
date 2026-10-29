import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from '../../../lib/gsap'
import { useCursor } from '../../../context/CursorContext'
import type { CursorState } from '../../../lib/cursor'
import { CURSOR_CONFIG, EASING_TRANSITION, globalMousePosition } from '../../../lib/cursor'
import { getLenis } from '../../../hooks/useLenis'

function checkFinePointer(): boolean {
  if (typeof window === 'undefined') return false
  const primaryFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const anyFine = window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches
  const pointerFine = window.matchMedia('(pointer: fine)').matches
  const isFinePointer = primaryFine || anyFine || pointerFine

  let isForced = false
  try {
    const urlParams = new URLSearchParams(window.location.search)
    isForced =
      urlParams.get('cursor') === 'force' ||
      import.meta.env.VITE_FORCE_CURSOR === 'true'
  } catch {
    // ignore
  }

  // Active in dev mode, on fine pointer devices, or when explicitly forced
  const enabled = isFinePointer || isForced || import.meta.env.DEV
  console.log(
    `[Cursor] primaryFine: ${primaryFine} | anyFine: ${anyFine} | pointerFine: ${pointerFine} | isForced: ${isForced} | Active: ${enabled}`
  )

  return enabled
}

export function Cursor() {
  const { subscribe } = useCursor()

  const [isEnabled, setIsEnabled] = useState(() => checkFinePointer())
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringInnerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  // Track cursor internal state without re-rendering
  const currentStateRef = useRef<CursorState>('default')
  const currentLabelRef = useRef<string>('')
  const magneticElementRef = useRef<HTMLElement | null>(null)
  const isPointerDownRef = useRef<boolean>(false)

  // Velocity tracking
  const prevMousePosRef = useRef({ x: -200, y: -200 })
  const velocityRef = useRef({ vx: 0, vy: 0, speed: 0, angle: 0 })

  // Listen for media query activation
  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsEnabled(true)
      }
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Physical mouse detection fallback (e.g. preview pane or hybrid laptop with touch)
  useEffect(() => {
    if (isEnabled) return

    const onInitialPointer = () => {
      console.log('[Cursor] Physical mouse movement detected. Activating custom cursor.')
      setIsEnabled(true)
    }

    window.addEventListener('pointermove', onInitialPointer, { passive: true, once: true })
    window.addEventListener('mousemove', onInitialPointer, { passive: true, once: true })
    return () => {
      window.removeEventListener('pointermove', onInitialPointer)
      window.removeEventListener('mousemove', onInitialPointer)
    }
  }, [isEnabled])

  useEffect(() => {
    if (!isEnabled) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const container = containerRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const ringInner = ringInnerRef.current
    const label = labelRef.current
    const ripple = rippleRef.current

    if (!container || !dot || !ring || !ringInner || !label || !ripple) return

    // Position layers initially offscreen centered with -50%
    gsap.set([dot, ring, ripple], {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%',
      x: -200,
      y: -200,
    })

    const targetPos = { x: -200, y: -200 }
    const dotPos = { x: -200, y: -200 }
    const ringPos = { x: -200, y: -200 }
    let hasMoved = false

    // Direct transform setters (immune to tween kills)
    const setDotX = gsap.quickSetter(dot, 'x', 'px')
    const setDotY = gsap.quickSetter(dot, 'y', 'px')
    const setRingX = gsap.quickSetter(ring, 'x', 'px')
    const setRingY = gsap.quickSetter(ring, 'y', 'px')
    const setRippleX = gsap.quickSetter(ripple, 'x', 'px')
    const setRippleY = gsap.quickSetter(ripple, 'y', 'px')

    // State transition applicator
    const applyStateStyles = (state: CursorState, customLabel: string) => {
      currentStateRef.current = state
      currentLabelRef.current = customLabel

      const isPressed = isPointerDownRef.current

      // Kill conflicting inner label/stretch tweens only
      gsap.killTweensOf([ringInner, label])

      switch (state) {
        case 'link': {
          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.25,
            ease: EASING_TRANSITION,
            overwrite: 'auto',
          })
          gsap.to(ring, {
            width: CURSOR_CONFIG.ringDefaultSize * CURSOR_CONFIG.ringLinkScale,
            height: CURSOR_CONFIG.ringDefaultSize * CURSOR_CONFIG.ringLinkScale,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            borderWidth: '1px',
            mixBlendMode: 'difference',
            opacity: 1,
            scale: isPressed ? 0.88 : 1,
            duration: 0.35,
            ease: EASING_TRANSITION,
            overwrite: 'auto',
          })
          gsap.to(label, {
            opacity: 0,
            scale: 0.6,
            duration: 0.2,
            overwrite: 'auto',
          })
          break
        }

        case 'view': {
          const displayLabel = customLabel || 'VIEW'
          label.textContent = displayLabel

          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: 'auto',
          })
          gsap.to(ring, {
            width: CURSOR_CONFIG.ringViewSize,
            height: CURSOR_CONFIG.ringViewSize,
            borderRadius: '50%',
            backgroundColor: 'var(--accent, #a855f7)',
            borderColor: 'transparent',
            borderWidth: '0px',
            mixBlendMode: 'normal',
            opacity: 1,
            scale: isPressed ? 0.9 : 1,
            duration: 0.4,
            ease: EASING_TRANSITION,
            overwrite: 'auto',
          })
          gsap.fromTo(
            label,
            { opacity: 0, scale: 0.7, y: 6 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              color: '#0a0a0a',
              duration: 0.35,
              ease: 'back.out(2)',
              overwrite: 'auto',
            }
          )
          break
        }

        case 'drag': {
          const displayLabel = customLabel || '← DRAG →'
          label.textContent = displayLabel

          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: 'auto',
          })
          gsap.to(ring, {
            width: CURSOR_CONFIG.ringDragSize,
            height: CURSOR_CONFIG.ringDragSize,
            borderRadius: '50%',
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            borderColor: 'var(--accent, #a855f7)',
            borderWidth: '1.5px',
            mixBlendMode: 'normal',
            opacity: 1,
            scale: isPressed ? 0.85 : 1,
            duration: 0.4,
            ease: EASING_TRANSITION,
            overwrite: 'auto',
          })
          gsap.fromTo(
            label,
            { opacity: 0, scale: 0.7, y: 4 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              color: 'var(--accent, #a855f7)',
              duration: 0.35,
              ease: 'back.out(1.8)',
              overwrite: 'auto',
            }
          )
          break
        }

        case 'text': {
          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: 'auto',
          })
          gsap.to(ring, {
            width: CURSOR_CONFIG.ringTextWidth,
            height: CURSOR_CONFIG.ringTextHeight,
            borderRadius: '1px',
            backgroundColor: 'var(--accent, #a855f7)',
            borderColor: 'transparent',
            borderWidth: '0px',
            mixBlendMode: 'normal',
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: EASING_TRANSITION,
            overwrite: 'auto',
          })
          gsap.to(label, {
            opacity: 0,
            scale: 0.5,
            duration: 0.15,
            overwrite: 'auto',
          })
          break
        }

        case 'hide': {
          gsap.to([dot, ring], {
            opacity: 0,
            scale: 0,
            duration: 0.2,
            overwrite: 'auto',
          })
          gsap.to(label, { opacity: 0, duration: 0.15, overwrite: 'auto' })
          break
        }

        case 'menu': {
          const displayLabel = customLabel || 'CLOSE'
          label.textContent = displayLabel

          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: 'auto',
          })
          gsap.to(ring, {
            width: 76,
            height: 76,
            borderRadius: '50%',
            backgroundColor: '#f2f0eb',
            borderColor: 'transparent',
            borderWidth: '0px',
            mixBlendMode: 'normal',
            opacity: 1,
            scale: isPressed ? 0.9 : 1,
            duration: 0.35,
            ease: EASING_TRANSITION,
            overwrite: 'auto',
          })
          gsap.fromTo(
            label,
            { opacity: 0, scale: 0.7, y: 4 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              color: '#0a0a0a',
              duration: 0.3,
              ease: 'back.out(2)',
              overwrite: 'auto',
            }
          )
          break
        }

        case 'magnetic': {
          const target = magneticElementRef.current
          if (target) {
            const rect = target.getBoundingClientRect()
            gsap.to(ring, {
              width: rect.width + 12,
              height: rect.height + 12,
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'var(--accent, #a855f7)',
              borderWidth: '1px',
              mixBlendMode: 'difference',
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: EASING_TRANSITION,
              overwrite: 'auto',
            })
          }
          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: 'auto',
          })
          gsap.to(label, { opacity: 0, duration: 0.15, overwrite: 'auto' })
          break
        }

        case 'default':
        default: {
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: EASING_TRANSITION,
            overwrite: 'auto',
          })
          gsap.to(ring, {
            width: CURSOR_CONFIG.ringDefaultSize,
            height: CURSOR_CONFIG.ringDefaultSize,
            borderRadius: '50%',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 255, 255, 0.9)',
            borderWidth: '1px',
            mixBlendMode: 'difference',
            opacity: 1,
            scale: isPressed ? 0.88 : 1,
            duration: 0.4,
            ease: EASING_TRANSITION,
            overwrite: 'auto',
          })
          gsap.to(label, {
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            overwrite: 'auto',
          })
          break
        }
      }
    }

    // Subscribe to programmatic context updates
    const unsubscribeContext = subscribe((state, customLabel, magneticTarget) => {
      magneticElementRef.current = magneticTarget
      applyStateStyles(state, customLabel)
    })

    // 60fps/120fps Ticker Loop: silky smooth lerp follow and velocity stretch
    const tickerUpdate = () => {
      if (!hasMoved) return

      let tx = targetPos.x
      let ty = targetPos.y

      if (currentStateRef.current === 'magnetic' && magneticElementRef.current) {
        const rect = magneticElementRef.current.getBoundingClientRect()
        tx = rect.left + rect.width / 2
        ty = rect.top + rect.height / 2
      }

      // Smooth lag interpolation
      const dotEase = prefersReducedMotion ? 1 : 0.75
      const ringEase = prefersReducedMotion ? 1 : 0.18

      dotPos.x += (targetPos.x - dotPos.x) * dotEase
      dotPos.y += (targetPos.y - dotPos.y) * dotEase

      ringPos.x += (tx - ringPos.x) * ringEase
      ringPos.y += (ty - ringPos.y) * ringEase

      setDotX(dotPos.x)
      setDotY(dotPos.y)
      setRingX(ringPos.x)
      setRingY(ringPos.y)

      // Velocity stretch (only when not reduced motion)
      if (!prefersReducedMotion) {
        const dx = targetPos.x - prevMousePosRef.current.x
        const dy = targetPos.y - prevMousePosRef.current.y
        const distance = Math.hypot(dx, dy)
        velocityRef.current.speed += (distance - velocityRef.current.speed) * 0.25
        prevMousePosRef.current = { x: targetPos.x, y: targetPos.y }

        const state = currentStateRef.current
        if ((state === 'default' || state === 'link') && velocityRef.current.speed > 1) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI)
          const stretch = Math.min(
            1 + velocityRef.current.speed * CURSOR_CONFIG.stretchFactor,
            CURSOR_CONFIG.stretchMax
          )

          gsap.to(ringInner, {
            scaleX: stretch,
            scaleY: 1 / stretch,
            rotation: angle,
            duration: 0.15,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        } else {
          gsap.to(ringInner, {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      }
    }

    gsap.ticker.add(tickerUpdate)

    // Element evaluation under cursor from point
    const evaluateElementUnderCursor = (clientX: number, clientY: number) => {
      if (clientX < 0 || clientY < 0) return

      const el = document.elementFromPoint(clientX, clientY)
      if (!el) {
        applyStateStyles('default', '')
        return
      }

      // 1. Explicit exceptions: restore native cursor and hide custom cursor
      const hideTarget = el.closest('[data-cursor="hide"], iframe, video, select')
      if (hideTarget) {
        applyStateStyles('hide', '')
        return
      }

      // 2. Check for explicit data-cursor or closest interactive tag
      const cursorTarget = el.closest(
        '[data-cursor], a, button, input:not([type="submit"]):not([type="button"]), textarea, [role="button"]'
      ) as HTMLElement | null

      if (!cursorTarget) {
        if (currentStateRef.current !== 'default') {
          applyStateStyles('default', '')
        }
        return
      }

      const explicitCursor = cursorTarget.getAttribute('data-cursor') as CursorState | null
      const explicitLabel = cursorTarget.getAttribute('data-cursor-label') || ''

      if (explicitCursor) {
        if (explicitCursor === 'magnetic') {
          magneticElementRef.current = cursorTarget
        }
        applyStateStyles(explicitCursor, explicitLabel)
        return
      }

      // Infer from HTML element type
      const tagName = cursorTarget.tagName.toLowerCase()
      if (tagName === 'a' || tagName === 'button' || cursorTarget.getAttribute('role') === 'button') {
        applyStateStyles('link', '')
      } else if (tagName === 'input' || tagName === 'textarea') {
        applyStateStyles('text', '')
      } else {
        applyStateStyles('default', '')
      }
    }

    // Pointer / mouse move listener
    const onMove = (e: MouseEvent | PointerEvent) => {
      const { clientX, clientY } = e
      targetPos.x = clientX
      targetPos.y = clientY
      globalMousePosition.x = clientX
      globalMousePosition.y = clientY

      if (!hasMoved) {
        hasMoved = true
        // Position directly at cursor on very first move so it never sits at (0, 0)
        dotPos.x = clientX
        dotPos.y = clientY
        ringPos.x = clientX
        ringPos.y = clientY
        setDotX(clientX)
        setDotY(clientY)
        setRingX(clientX)
        setRingY(clientY)
        prevMousePosRef.current = { x: clientX, y: clientY }

        document.documentElement.classList.add('cursor-ready')
        gsap.to(container, { opacity: 1, duration: 0.15, ease: 'power2.out' })
        evaluateElementUnderCursor(clientX, clientY)
      }
    }

    // Event delegation on pointerover
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      evaluateElementUnderCursor(e.clientX, e.clientY)
    }

    const onPointerOut = (e: PointerEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related) {
        applyStateStyles('default', '')
      }
    }

    // Pointer Down (Click scale-down pulse)
    const onPointerDown = (e: PointerEvent | MouseEvent) => {
      isPointerDownRef.current = true
      const state = currentStateRef.current

      if (state === 'drag') {
        gsap.to(ring, { scale: 0.82, duration: 0.12, ease: 'power2.out', overwrite: 'auto' })
      } else if (state !== 'hide' && state !== 'text') {
        gsap.to(ring, { scale: 0.86, duration: 0.12, ease: 'power2.out', overwrite: 'auto' })
      }

      setRippleX(e.clientX)
      setRippleY(e.clientY)
    }

    // Pointer Up (Ripple trigger & return scale)
    const onPointerUp = () => {
      isPointerDownRef.current = false
      const state = currentStateRef.current

      if (state !== 'hide') {
        gsap.to(ring, { scale: 1, duration: 0.25, ease: 'back.out(2)', overwrite: 'auto' })

        // Trigger expanding ripple
        gsap.fromTo(
          ripple,
          { scale: 0.8, opacity: 0.65 },
          {
            scale: 2.4,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          }
        )
      }
    }

    // Window Leave / Enter
    const onWindowLeave = () => {
      gsap.to(container, { opacity: 0, duration: 0.25, ease: 'power2.out' })
    }

    const onWindowEnter = () => {
      if (hasMoved) {
        gsap.to(container, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      }
    }

    // Lenis Scroll & Native Scroll re-evaluation
    const handleScroll = () => {
      if (hasMoved) {
        evaluateElementUnderCursor(targetPos.x, targetPos.y)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('pointerover', onPointerOver, { passive: true })
    document.addEventListener('pointerout', onPointerOut, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onWindowLeave)
    document.documentElement.addEventListener('mouseenter', onWindowEnter)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const lenis = getLenis()
    if (lenis) {
      lenis.on('scroll', handleScroll)
    }

    return () => {
      document.documentElement.classList.remove('cursor-ready')
      gsap.ticker.remove(tickerUpdate)
      unsubscribeContext()

      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.documentElement.removeEventListener('mouseleave', onWindowLeave)
      document.documentElement.removeEventListener('mouseenter', onWindowEnter)
      window.removeEventListener('scroll', handleScroll)

      if (lenis) {
        lenis.off('scroll', handleScroll)
      }
    }
  }, [subscribe, isEnabled])

  if (!isEnabled) return null

  return createPortal(
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999999] opacity-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Central Dot Layer */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white will-change-transform"
        style={{ mixBlendMode: 'difference' }}
      />

      {/* 2. Expressive Lagging Ring Layer */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white flex items-center justify-center will-change-transform"
        style={{ mixBlendMode: 'difference' }}
      >
        {/* Inner element for velocity-based stretch and rotation */}
        <div
          ref={ringInnerRef}
          className="w-full h-full flex items-center justify-center rounded-full will-change-transform"
        >
          {/* Label inside ring for 'view', 'drag', 'menu' states */}
          <span
            ref={labelRef}
            className="font-mono text-[10px] font-bold tracking-widest uppercase opacity-0 select-none pointer-events-none whitespace-nowrap px-1"
          />
        </div>
      </div>

      {/* 3. Soft Expanding Click Ripple */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white opacity-0 pointer-events-none will-change-transform"
      />
    </div>,
    document.body
  )
}
