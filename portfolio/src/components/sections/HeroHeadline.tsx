import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import confetti from 'canvas-confetti'

const FIRST_NAME = ['J', 'E', 'V', 'I', 'N']
const LAST_NAME = ['P', 'A', 'R', 'M', 'A', 'R']

export function HeroHeadline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const dotRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  // Character hover bounce
  const handleCharHover = (index: number) => {
    const el = lettersRef.current[index]
    if (!el) return

    gsap.killTweensOf(el)
    gsap.timeline()
      .to(el, {
        y: -18,
        scale: 1.05,
        color: '#c8ff00',
        textShadow: '0 0 25px rgba(200, 255, 0, 0.6)',
        duration: 0.16,
        ease: 'power2.out',
      })
      .to(el, {
        y: 0,
        scale: 1,
        color: '#f2f0eb',
        textShadow: 'none',
        duration: 0.45,
        ease: 'elastic.out(1.2, 0.4)',
        clearProps: 'transform,color,textShadow',
      })

    // Ripple neighbors
    const prev = lettersRef.current[index - 1]
    const next = lettersRef.current[index + 1]

    if (prev) {
      gsap.to(prev, {
        y: -8,
        duration: 0.14,
        yoyo: true,
        repeat: 1,
        ease: 'power1.out',
        clearProps: 'transform',
      })
    }
    if (next) {
      gsap.to(next, {
        y: -8,
        duration: 0.14,
        yoyo: true,
        repeat: 1,
        ease: 'power1.out',
        clearProps: 'transform',
      })
    }
  }

  // Interactive Dot Click Confetti
  const handleDotClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const rect = dotRef.current?.getBoundingClientRect()
    const originX = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5
    const originY = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: originX, y: originY },
      colors: ['#c8ff00', '#f2f0eb', '#ffffff'],
    })

    if (dotRef.current) {
      gsap.timeline()
        .to(dotRef.current, { scale: 1.6, rotate: 180, duration: 0.2, ease: 'back.out(2)' })
        .to(dotRef.current, { scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)', clearProps: 'transform' })
    }
  }

  // Opening Entrance Reveal (Synchronized with Preloader, Immortal after finish)
  useEffect(() => {
    const chars = lettersRef.current.filter(Boolean) as HTMLSpanElement[]
    if (chars.length === 0) return

    // If already animated in, make sure letters are permanently visible with zero inline opacity/transforms
    if (hasAnimated.current) {
      gsap.set(chars, { clearProps: 'all' })
      if (dotRef.current) gsap.set(dotRef.current, { clearProps: 'opacity,transform' })
      return
    }

    // If preloader is active, position characters below the mask waiting for curtains to open
    const isPreloaderActive = typeof window !== 'undefined' && !!window.__PRELOADER_ACTIVE__
    if (isPreloaderActive) {
      gsap.set(chars, {
        yPercent: 115,
        opacity: 0,
      })
      if (dotRef.current) {
        gsap.set(dotRef.current, {
          scale: 0,
          opacity: 0,
        })
      }
    }

    const runEntrance = () => {
      if (hasAnimated.current) return
      hasAnimated.current = true

      const tl = gsap.timeline({
        delay: 0.15,
        onComplete: () => {
          // CRITICAL: Clear all GSAP inline styles so the name is 100% standard CSS and NEVER vanishes!
          gsap.set(chars, { clearProps: 'all' })
          if (dotRef.current) gsap.set(dotRef.current, { clearProps: 'opacity,transform' })
        },
      })

      // Masked slide-up of each letter
      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.045,
        ease: 'power3.out',
      })

      // Elastic pop of the lime accent dot
      if (dotRef.current) {
        tl.to(
          dotRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.85,
            ease: 'back.out(2.2)',
          },
          '-=0.5'
        )
      }
    }

    window.addEventListener('hero:reveal', runEntrance)

    // Fallback: If preloader was not active or already seen
    const checkTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && !window.__PRELOADER_ACTIVE__) {
        runEntrance()
      }
    }, 120)

    return () => {
      window.removeEventListener('hero:reveal', runEntrance)
      clearTimeout(checkTimer)
    }
  }, [])

  // 3D Parallax Tilt on Cursor Move in Hero
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const xPercent = (e.clientX / innerWidth - 0.5) * 2
      const yPercent = (e.clientY / innerHeight - 0.5) * 2

      gsap.to(el, {
        rotateY: xPercent * 4,
        rotateX: -yPercent * 4,
        x: xPercent * 10,
        y: yPercent * 6,
        duration: 0.8,
        ease: 'power2.out',
        transformPerspective: 1000,
        transformOrigin: 'center center',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        clearProps: 'transform',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="my-auto py-4 select-none will-change-transform"
      style={{ perspective: '1000px' }}
      data-cursor="view"
      data-cursor-label="JEVIN"
    >
      {/* First Row: JEVIN */}
      <div className="overflow-hidden pb-1">
        <h1 className="font-display font-extrabold text-[clamp(2.75rem,11vw,9.5rem)] leading-[0.88] tracking-tight uppercase text-[#f2f0eb] whitespace-nowrap flex items-center">
          {FIRST_NAME.map((char, index) => (
            <span
              key={`first-${index}`}
              className="inline-block overflow-hidden py-1"
            >
              <span
                ref={(el) => (lettersRef.current[index] = el)}
                onMouseEnter={() => handleCharHover(index)}
                className="inline-block cursor-pointer transition-colors duration-200 hover:text-[#c8ff00] will-change-transform"
              >
                {char}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Second Row: PARMAR. */}
      <div className="overflow-hidden mt-1 md:mt-2 pb-1">
        <h1 className="font-display font-extrabold text-[clamp(2.75rem,11vw,9.5rem)] leading-[0.88] tracking-tight uppercase text-[#f2f0eb] flex items-baseline whitespace-nowrap">
          {LAST_NAME.map((char, index) => {
            const letterIdx = FIRST_NAME.length + index
            return (
              <span
                key={`last-${index}`}
                className="inline-block overflow-hidden py-1"
              >
                <span
                  ref={(el) => (lettersRef.current[letterIdx] = el)}
                  onMouseEnter={() => handleCharHover(letterIdx)}
                  className="inline-block cursor-pointer transition-colors duration-200 hover:text-[#c8ff00] will-change-transform"
                >
                  {char}
                </span>
              </span>
            )
          })}

          {/* Interactive Lime Dot Accent with Pulse & Micro-Confetti */}
          <span
            ref={dotRef}
            onClick={handleDotClick}
            data-cursor="magnetic"
            data-cursor-label="EXPLORE"
            className="group relative inline-block w-[2vw] h-[2vw] min-w-3 min-h-3 max-w-5 max-h-5 bg-[#c8ff00] ml-2 sm:ml-4 rounded-xs shrink-0 cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-45 hover:shadow-[0_0_20px_#c8ff00]"
            title="Click for celebratory burst"
          >
            <span className="absolute inset-0 rounded-xs bg-[#c8ff00] animate-ping opacity-30" />
          </span>
        </h1>
      </div>
    </div>
  )
}
