import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Code2, Compass, Cpu, Layers } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { TextOpacityScroll } from '../motion/TextOpacityScroll'
import { STATS } from '../../data/experience'
import { DownloadCV } from '../ui/DownloadCV'

export function IntroAbout() {
  const containerRef = useRef<HTMLElement>(null)
  const stickyColRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    // Scrubbed number counters
    const counterElements = statsRef.current?.querySelectorAll('.stat-number')
    if (counterElements) {
      counterElements.forEach((el) => {
        const targetVal = parseFloat(el.getAttribute('data-target') || '0')
        const isDecimal = targetVal % 1 !== 0

        const obj = { val: 0 }
        gsap.to(obj, {
          val: targetVal,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          duration: 1.8,
          onUpdate: () => {
            el.textContent = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val).toString()
          }
        })
      })
    }
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-24 md:py-36 border-hairline-b overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 md:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7]">
            // 01
          </span>
          <span className="h-[1px] w-8 bg-[#a855f7]/40" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#8c8c88]">
            Philosophy &amp; Background
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Column: Minimalist Tech Artifact & Coordinates */}
          <div
            ref={stickyColRef}
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-6"
          >
            <div
              className="relative rounded-2xl border border-white/10 bg-[#121212]/80 p-6 md:p-8 backdrop-blur-md overflow-hidden group transition-colors duration-500 hover:border-[#a855f7]/40"
            >
              {/* Subtle background grid pattern */}
              <div
                className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col justify-between min-h-[320px]">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7]" />
                    <span className="font-mono text-xs uppercase text-[#f2f0eb]">
                      Architect Persona
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#8c8c88]">
                    JP-DEV-2026
                  </span>
                </div>

                <div className="my-6 space-y-3">
                  <div className="font-display text-2xl font-bold text-[#f2f0eb]">
                    Jevin Parmar
                  </div>
                  <p className="font-mono text-xs text-[#8c8c88] leading-relaxed">
                    Full-Stack Engineer with deep specialization in MERN, Java backends, Python automation, Flutter mobile craft, and high-performance interactive interfaces.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/10 font-mono text-[11px]">
                  <div className="flex items-center gap-2 text-[#8c8c88]">
                    <Compass className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>India (IST)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8c8c88]">
                    <Cpu className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>Multi-Threaded</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8c8c88]">
                    <Layers className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>Distributed Systems</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8c8c88]">
                    <Code2 className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>Fluid GSAP UI</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/2 p-4 font-mono text-xs text-[#8c8c88] flex items-center justify-between">
              <span>Codebase Discipline:</span>
              <span className="text-[#a855f7]">Strict TypeScript &amp; 0-Latency UI</span>
            </div>

            {/* Placement B: Download CV Button in About section */}
            <div className="pt-2 flex items-center">
              <DownloadCV variant="button" />
            </div>
          </div>

          {/* Right Column: Scrubbed Reveal Paragraph & Scrubbed Counters */}
          <div className="lg:col-span-7 space-y-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#8c8c88] mb-6">
                The Engineering Standard
              </p>

              <TextOpacityScroll
                className="text-2xl sm:text-3xl md:text-4xl font-light text-[#f2f0eb]"
                text="I engineer software at the razor edge where backend resilience meets cinematic interactivity. With deep roots across the MERN stack, enterprise Java services, Python data pipelines, and Flutter mobile ecosystems, I build digital products designed to operate under intense scale while delivering 60fps micro-motion that feels tactile and alive."
                highlightWords={['resilience', 'interactivity', 'scale', '60fps', 'tactile', 'MERN', 'Java', 'Flutter']}
              />

              <div className="mt-8 pt-8 border-hairline-t">
                <TextOpacityScroll
                  className="text-base sm:text-lg text-[#8c8c88] font-normal"
                  text="Whether optimizing sub-40ms vector similarity lookups in PostgreSQL, streaming telemetry through multi-threaded Java Spring workers, or sculpting custom GSAP scroll transitions, every layer is crafted with obsessive technical discipline."
                  highlightWords={['sub-40ms', 'PostgreSQL', 'Spring', 'GSAP']}
                />
              </div>
            </div>

            {/* Scrubbed Statistics Counters */}
            <div ref={statsRef} className="pt-8 border-hairline-t">
              <p className="font-mono text-xs uppercase tracking-widest text-[#8c8c88] mb-8">
                Verified Metrics
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                {STATS.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-baseline font-display font-bold text-4xl sm:text-5xl text-[#f2f0eb] mb-1">
                      <span className="stat-number" data-target={stat.value}>
                        0
                      </span>
                      <span className="text-[#a855f7] font-sans text-2xl sm:text-3xl ml-0.5">
                        {stat.suffix}
                      </span>
                    </div>
                    <span className="font-mono text-xs uppercase text-[#f2f0eb] font-medium tracking-wide">
                      {stat.label}
                    </span>
                    <span className="font-sans text-[11px] text-[#8c8c88] mt-1">
                      {stat.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
