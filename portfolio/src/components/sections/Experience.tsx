import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Briefcase, Calendar, MapPin, Check } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { EXPERIENCES } from '../../data/experience'

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll('.timeline-item')

    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-24 md:py-36 border-hairline-b overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-8 border-hairline-b">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7]">
                // 04
              </span>
              <span className="h-[1px] w-8 bg-[#a855f7]/40" />
              <h2 className="font-mono text-xs uppercase tracking-widest text-[#8c8c88]">
                Career Trajectory
              </h2>
            </div>
            <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#f2f0eb]">
              Experience
            </h3>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs text-[#8c8c88] max-w-xs">
            Proven tenure delivering enterprise backends, distributed systems, and award-grade frontend applications.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-white/10 ml-3 sm:ml-6 md:ml-8 pl-6 sm:pl-10 md:pl-12 space-y-16">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="timeline-item group relative"
            >
              {/* Timeline Node Pin */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] md:-left-[55px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full border bg-[#0a0a0a] transition-all duration-300 ${
                  exp.current
                    ? 'border-[#a855f7] text-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'border-white/20 text-[#8c8c88] group-hover:border-white/50'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    exp.current ? 'bg-[#a855f7] animate-ping' : 'bg-white/40'
                  }`}
                />
              </div>

              {/* Card Container */}
              <div className="rounded-2xl border border-white/10 bg-[#121212]/60 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-[#a855f7]/40 group-hover:bg-[#141414]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-display text-2xl sm:text-3xl font-bold text-[#f2f0eb] group-hover:text-[#a855f7] transition-colors">
                        {exp.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-xs text-[#8c8c88]">
                      <span className="text-[#f2f0eb] font-semibold flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#a855f7]" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-[#a855f7]">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#8c8c88] leading-relaxed my-6">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="space-y-2.5 mb-6">
                  {exp.achievements.map((ach, achIdx) => (
                    <div key={achIdx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#a855f7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#a855f7]" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#f2f0eb]/90 leading-normal">
                        {ach}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-sm border border-white/10 bg-white/5 font-mono text-[11px] text-[#8c8c88] group-hover:text-[#f2f0eb] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
