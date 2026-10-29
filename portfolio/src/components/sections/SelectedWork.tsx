import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { PROJECTS } from '../../data/projects'
import { GithubIcon } from '../common/SocialIcons'
import { Magnetic } from '../motion/Magnetic'

export function SelectedWork() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    // ScrollTrigger clip-path and scale reveal for project images
    const projectCards = containerRef.current.querySelectorAll('.project-card')

    projectCards.forEach((card) => {
      const img = card.querySelector('.project-img')
      const info = card.querySelector('.project-info')

      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.15, clipPath: 'inset(12% 0% 12% 0%)' },
          {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        )
      }

      if (info) {
        gsap.fromTo(
          info,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative py-24 md:py-36 border-hairline-b overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-8 border-hairline-b">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7]">
                // 02
              </span>
              <span className="h-[1px] w-8 bg-[#a855f7]/40" />
              <h2 className="font-mono text-xs uppercase tracking-widest text-[#8c8c88]">
                Featured Portfolio
              </h2>
            </div>
            <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#f2f0eb]">
              Selected Work
            </h3>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs text-[#8c8c88] max-w-xs">
            Curated systems, real-time distributed backends, and award-grade digital experiences.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-24 md:space-y-36">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.slug}
              className="project-card group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Project Visual / Link with Shared Element motion layoutId */}
              <div className="lg:col-span-7 order-2 lg:order-1 overflow-hidden rounded-2xl bg-[#141414] border border-white/10 group-hover:border-[#a855f7]/40 transition-colors duration-500">
                <Link
                  to={`/work/${project.slug}`}
                  data-cursor="view"
                  data-cursor-label="VIEW"
                  className="block relative aspect-16/10 overflow-hidden"
                  aria-label={`View ${project.title} project details`}
                >
                  <motion.img
                    layoutId={`project-image-${project.slug}`}
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="project-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                  
                  {/* Floating Action Badge on Card */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/10">
                    <span className="font-mono text-[10px] uppercase text-[#a855f7] tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Project Information */}
              <div className="project-info lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-[#8c8c88] mb-3">
                    <span className="text-[#a855f7]">0{idx + 1} // {project.year}</span>
                    <span>{project.role}</span>
                  </div>

                  <h4 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f0eb] group-hover:text-[#a855f7] transition-colors duration-300">
                    <Link
                      to={`/work/${project.slug}`}
                      data-cursor="link"
                    >
                      {project.title}
                    </Link>
                  </h4>

                  <p className="font-mono text-xs uppercase text-[#8c8c88] tracking-wider mt-1 mb-4">
                    {project.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-[#8c8c88] leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-sm border border-white/10 bg-white/5 font-mono text-[11px] text-[#f2f0eb]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions: Case Study link + GitHub */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <Magnetic strength={0.3} dataCursor="magnetic">
                    <Link
                      to={`/work/${project.slug}`}
                      data-cursor="link"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#f2f0eb] hover:text-[#a855f7] transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4 text-[#a855f7]" />
                    </Link>
                  </Magnetic>

                  <Magnetic strength={0.3} dataCursor="magnetic">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8c8c88] hover:text-[#f2f0eb] transition-colors ml-4"
                      aria-label="View Source Code"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
