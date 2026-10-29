import { useEffect, useState, useRef } from 'react'
import { gsap } from '../../lib/gsap'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0)
  const [shouldRender, setShouldRender] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const curtainTopRef = useRef<HTMLDivElement>(null)
  const curtainBottomRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In production, play once per session. In dev, allow viewing on refresh.
    const isDev = import.meta.env.DEV
    const forceRun = typeof window !== 'undefined' && window.location.search.includes('loader=force')
    const hasViewed = !isDev && !forceRun && sessionStorage.getItem('jevin_preloader_seen')

    if (hasViewed) {
      if (typeof window !== 'undefined') {
        window.__PRELOADER_ACTIVE__ = false
        window.dispatchEvent(new CustomEvent('curtains:open'))
        window.dispatchEvent(new CustomEvent('hero:reveal'))
      }
      setShouldRender(false)
      onComplete()
      return
    }

    if (typeof window !== 'undefined') {
      window.__PRELOADER_ACTIVE__ = true
    }

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Counter animation 0 -> 100 with unhurried, luxury pacing
      const counterObj = { val: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('jevin_preloader_seen', 'true')
          if (typeof window !== 'undefined') {
            window.__PRELOADER_ACTIVE__ = false
          }
          setShouldRender(false)
          onComplete()
        }
      })

      tl.to(counterObj, {
        val: 100,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCount(Math.floor(counterObj.val))
        }
      })
      .to(contentRef.current, {
        opacity: 0,
        y: -25,
        duration: 0.5,
        ease: 'power2.in'
      }, '+=0.35') // Savor the 100% completed state before curtain split
      .to(curtainTopRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: 'expo.inOut',
        onStart: () => {
          if (typeof window !== 'undefined') {
            window.__PRELOADER_ACTIVE__ = false
            window.dispatchEvent(new CustomEvent('curtains:open'))
            window.dispatchEvent(new CustomEvent('hero:reveal'))
          }
        }
      })
      .to(curtainBottomRef.current, {
        yPercent: 100,
        duration: 1.1,
        ease: 'expo.inOut'
      }, '<')
    }, containerRef.current)

    return () => {
      if (typeof window !== 'undefined') {
        window.__PRELOADER_ACTIVE__ = false
      }
      ctx.revert()
    }
  }, [onComplete])

  if (!shouldRender) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] flex flex-col pointer-events-auto overflow-hidden bg-transparent"
    >
      {/* Top Curtain Panel */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] border-b border-white/5 z-10 will-change-transform"
      />

      {/* Bottom Curtain Panel */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] border-t border-white/5 z-10 will-change-transform"
      />

      {/* Preloader Center Content */}
      <div
        ref={contentRef}
        className="relative z-20 m-auto flex flex-col items-center justify-center text-center px-6 max-w-xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-[#a855f7] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#a855f7]">
            System Initialization
          </span>
        </div>

        <div className="font-display font-bold text-6xl sm:text-8xl md:text-9xl tracking-tighter text-[#f2f0eb] tabular-nums select-none mb-4">
          {count < 10 ? `00${count}` : count < 100 ? `0${count}` : count}
          <span className="text-[#a855f7] font-sans text-3xl sm:text-4xl ml-2">%</span>
        </div>

        <div className="w-52 sm:w-72 h-[1px] bg-white/10 relative overflow-hidden my-5">
          <div
            className="absolute top-0 left-0 h-full bg-[#a855f7] transition-all duration-100 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>

        <p className="font-sans text-xs tracking-widest uppercase text-[#8c8c88] mt-2">
          Jevin Parmar &mdash; Creative Software Developer
        </p>
      </div>
    </div>
  )
}
