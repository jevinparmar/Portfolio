import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Code, Database, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { SKILL_CATEGORIES } from '../../data/skills'

const ICONS = [Code, Database, Smartphone, Sparkles]

export function TechStack() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll('.skill-card')

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative py-24 md:py-36 border-hairline-b overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 pb-8 border-hairline-b">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7]">
                // 03
              </span>
              <span className="h-[1px] w-8 bg-[#a855f7]/40" />
              <h2 className="font-mono text-xs uppercase tracking-widest text-[#8c8c88]">
                Technical Competence
              </h2>
            </div>
            <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#f2f0eb]">
              Stack &amp; Systems
            </h3>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs text-[#8c8c88] max-w-xs">
            From distributed Java &amp; Python backends to native Flutter mobile and fluid MERN frontend engineering.
          </p>
        </div>

        {/* 4 Categorical Stack Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = ICONS[idx % ICONS.length]

            return (
              <div
                key={cat.category}
                className="skill-card group rounded-2xl border border-white/10 bg-[#121212]/70 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#a855f7]/40 hover:bg-[#141414]"
              >
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a855f7] group-hover:bg-[#a855f7] group-hover:text-black transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-[#f2f0eb]">
                        {cat.category}
                      </h4>
                      <p className="font-mono text-xs text-[#8c8c88] mt-0.5">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#a855f7]">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/item flex flex-col p-3 rounded-lg bg-white/2 hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />
                          <span className="font-sans font-medium text-sm text-[#f2f0eb]">
                            {skill.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded-xs">
                          {skill.level}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#8c8c88] mt-1 pl-5.5">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Technical Philosophy Banner */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-[#a855f7] uppercase tracking-wider">
              Architecture Axiom
            </span>
            <p className="font-display text-lg sm:text-xl font-bold text-[#f2f0eb]">
              Clean abstractions, zero-waste state trees, and relentless performance testing.
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#8c8c88]">
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">Git &amp; GitHub CI/CD</span>
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">Docker Containers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
