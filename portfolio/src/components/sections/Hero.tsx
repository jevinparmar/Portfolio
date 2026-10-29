import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowDownRight, Terminal } from 'lucide-react'
import confetti from 'canvas-confetti'
import { gsap } from '../../lib/gsap'
import { Magnetic } from '../motion/Magnetic'
import { MARQUEE_SKILLS } from '../../data/skills'
import { getLenis } from '../../hooks/useLenis'

const FIRST_NAME = ['J', 'E', 'V', 'I', 'N']
const LAST_NAME = ['P', 'A', 'R', 'M', 'A', 'R']

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)

  // Interactive Character Hover Physics
  const handleCharHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget
    gsap.killTweensOf(el)
    gsap.timeline()
      .to(el, {
        y: -18,
        scale: 1.05,
        color: '#a855f7',
        textShadow: '0 0 25px rgba(168, 85, 247, 0.6)',
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
  }

  // Interactive Lime Accent Dot Click Confetti
  const handleDotClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const rect = dotRef.current?.getBoundingClientRect()
    const originX = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5
    const originY = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: originX, y: originY },
      colors: ['#a855f7', '#c084fc', '#f2f0eb', '#7e22ce'],
    })

    if (dotRef.current) {
      gsap.timeline()
        .to(dotRef.current, { scale: 1.6, rotate: 180, duration: 0.2, ease: 'back.out(2)' })
        .to(dotRef.current, { scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)', clearProps: 'transform' })
    }
  }

  useGSAP(() => {
    if (!containerRef.current) return

    // Subtle parallax effect on scroll
    gsap.to(headlineRef.current, {
      yPercent: 25,
      opacity: 0.65,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    gsap.to(metaRef.current, {
      yPercent: 40,
      opacity: 0.4,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    // Headline entrance reveal choreography
    const hasSeenPreloader = typeof window !== 'undefined' && (
      sessionStorage.getItem('jevin_preloader_seen') ||
      (!import.meta.env.DEV && !window.location.search.includes('loader=force'))
    )

    let revealed = false

    const triggerReveal = () => {
      if (revealed) return
      revealed = true

      const chars = containerRef.current?.querySelectorAll('.hero-char')
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.04,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        )
      }

      if (dotRef.current) {
        gsap.fromTo(
          dotRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.4,
            ease: 'back.out(2.2)',
            clearProps: 'transform,opacity',
          }
        )
      }
    }

    // If preloader was already seen, reveal quickly
    if (hasSeenPreloader) {
      const quickTimer = setTimeout(triggerReveal, 150)
      return () => clearTimeout(quickTimer)
    }

    // Listen for the curtains parting event
    window.addEventListener('curtains:open', triggerReveal)
    window.addEventListener('hero:reveal', triggerReveal)

    // Fail-safe timeout: curtains open around 3.55s, 3.6s guarantees reveal even if event was missed
    const fallbackTimer = setTimeout(triggerReveal, 3600)

    return () => {
      window.removeEventListener('curtains:open', triggerReveal)
      window.removeEventListener('hero:reveal', triggerReveal)
      clearTimeout(fallbackTimer)
    }
  }, { scope: containerRef })

  const handleScrollToWork = () => {
    const el = document.getElementById('work')
    if (el) {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(el, { duration: 1.4, offset: -20 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden border-hairline-b"
    >
      {/* Background Decorative Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[#a855f7]/8 blur-[120px] will-change-transform"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-20 -left-40 w-[400px] h-[400px] rounded-full bg-white/3 blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Top Status & Architectural Index */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-10 text-xs font-mono text-[#8c8c88]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
            <span className="text-[#f2f0eb]">AVAILABLE FOR CONTRACTS &amp; SENIOR ROLES</span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#a855f7]" />
              <span>FOLIO // 2026 EDITION</span>
            </span>
            <span>22.5726° N, 88.3639° E (INDIA)</span>
          </div>
        </div>

        {/* Monumental Hero Headline with Character Stagger & Hover Physics */}
        <div
          ref={headlineRef}
          className="my-auto py-4 select-none cursor-default"
          data-cursor="view"
          data-cursor-label="JEVIN"
        >
          {/* First Row: JEVIN */}
          <div className="overflow-hidden pb-1">
            <h1 className="hero-title-first font-display font-extrabold text-[clamp(2.75rem,11vw,9.5rem)] leading-[0.88] tracking-tight uppercase text-[#f2f0eb] whitespace-nowrap flex items-center">
              {FIRST_NAME.map((char, index) => (
                <span
                  key={`first-${index}`}
                  className="inline-block overflow-hidden py-1"
                >
                  <span
                    onMouseEnter={handleCharHover}
                    className="hero-char inline-block cursor-pointer transition-colors duration-200 hover:text-[#a855f7] will-change-transform"
                  >
                    {char}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Second Row: PARMAR. */}
          <div className="overflow-hidden mt-1 md:mt-2 pb-1">
            <h1 className="hero-title-last font-display font-extrabold text-[clamp(2.75rem,11vw,9.5rem)] leading-[0.88] tracking-tight uppercase text-[#f2f0eb] flex items-baseline whitespace-nowrap">
              {LAST_NAME.map((char, index) => (
                <span
                  key={`last-${index}`}
                  className="inline-block overflow-hidden py-1"
                >
                  <span
                    onMouseEnter={handleCharHover}
                    className="hero-char inline-block cursor-pointer transition-colors duration-200 hover:text-[#a855f7] will-change-transform"
                  >
                    {char}
                  </span>
                </span>
              ))}

              {/* Interactive Lime Dot Accent with Pulse & Micro-Confetti */}
              <span
                ref={dotRef}
                onClick={handleDotClick}
                data-cursor="magnetic"
                data-cursor-label="EXPLORE"
                className="hero-dot group relative inline-block w-[2vw] h-[2vw] min-w-3 min-h-3 max-w-5 max-h-5 bg-[#a855f7] ml-2 sm:ml-4 rounded-xs shrink-0 cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-45 hover:shadow-[0_0_20px_#a855f7]"
                title="Click for celebratory burst"
              >
                <span className="absolute inset-0 rounded-xs bg-[#a855f7] animate-ping opacity-30" />
              </span>
            </h1>
          </div>
        </div>

        {/* Editorial Subgrid / Bio / Call to Actions */}
        <div ref={metaRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 md:pt-12 border-hairline-t">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#8c8c88] mb-2">
                Specialization
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#f2f0eb] leading-snug">
                Software Developer &amp; Creative Technologist
              </h2>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] text-[#8c8c88]">
              <span className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10">Full-Stack MERN</span>
              <span className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10">Java Systems</span>
              <span className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10">Python Pipelines</span>
              <span className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10">Flutter Mobile</span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#8c8c88] mb-2">
                Manifesto
              </p>
              <p className="text-sm sm:text-base text-[#8c8c88] leading-relaxed">
                Architecting high-throughput backends and cinematic frontends. Every line of code is measured in execution latency, architectural elegance, and sensory motion response.
              </p>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col justify-end items-start md:items-end">
            <Magnetic strength={0.4} dataCursor="magnetic">
              <button
                onClick={handleScrollToWork}
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-full bg-[#f2f0eb] px-6 py-4 text-xs font-mono uppercase tracking-widest text-[#0a0a0a] transition-all duration-300 hover:bg-[#a855f7] hover:text-white hover:scale-105"
              >
                <span>Explore Work</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Infinite Skills Marquee */}
      <div className="mt-14 md:mt-20 border-hairline-t border-hairline-b py-3.5 bg-black/40 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {MARQUEE_SKILLS.concat(MARQUEE_SKILLS).map((skill, index) => (
            <div key={index} className="flex items-center mx-6">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#8c8c88] hover:text-[#a855f7] transition-colors cursor-default">
                {skill}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]/60 ml-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
