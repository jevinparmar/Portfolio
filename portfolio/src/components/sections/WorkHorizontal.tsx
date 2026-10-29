import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { PROJECTS } from '../../data/projects'

export function WorkHorizontal() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return

    // Check screen width; skip pinning on very narrow screens for natural mobile UX
    if (window.innerWidth < 768) return

    const track = trackRef.current
    const scrollAmount = track.scrollWidth - window.innerWidth + 120

    const pinAnim = gsap.to(track, {
      x: -scrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollAmount}`,
        invalidateOnRefresh: true,
      }
    })

    return () => {
      pinAnim.kill()
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 border-hairline-b bg-[#0c0c0c]/80 backdrop-blur-sm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7]">
            // 02.B
          </span>
          <span className="h-[1px] w-8 bg-[#a855f7]/40" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#8c8c88]">
            Horizontal Exhibition Rail
          </h2>
        </div>

        <span className="hidden md:inline font-mono text-xs text-[#8c8c88]">
          [ SCROLL TO EXPAND PANORAMA ]
        </span>
      </div>

      {/* Horizontal Pinned Track with data-cursor="drag" */}
      <div
        ref={trackRef}
        data-cursor="drag"
        data-cursor-label="← DRAG →"
        className="flex gap-8 px-4 sm:px-8 md:px-16 w-max will-change-transform"
      >
        {PROJECTS.map((project, idx) => (
          <div
            key={`horiz-${project.slug}`}
            data-cursor="drag"
            data-cursor-label="← DRAG →"
            className="group relative w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[38vw] flex-shrink-0 rounded-2xl bg-[#141414] border border-white/10 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#a855f7]/50"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#8c8c88] mb-4">
                <span className="text-[#a855f7]">EXHIBIT 0{idx + 1}</span>
                <span>{project.category}</span>
              </div>

              <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-6 bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f0eb] group-hover:text-[#a855f7] transition-colors">
                {project.title}
              </h4>
              <p className="font-mono text-xs text-[#8c8c88] mt-1 mb-3">
                {project.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-[#8c8c88] line-clamp-2 leading-relaxed">
                {project.shortDesc}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#8c8c88]">
                {project.year} &bull; {project.role}
              </span>

              <Link
                to={`/work/${project.slug}`}
                data-cursor="link"
                className="flex items-center gap-1 font-mono text-xs text-[#a855f7] uppercase tracking-wider group-hover:underline"
              >
                <span>Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
