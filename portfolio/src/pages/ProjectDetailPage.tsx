import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight, ExternalLink, Cpu, CheckCircle } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import { GithubIcon } from '../components/common/SocialIcons'
import { Magnetic } from '../components/motion/Magnetic'
import { getLenis } from '../hooks/useLenis'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug)
  const project = PROJECTS[currentIndex]
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  // Reset scroll on mount
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-4xl font-bold mb-4">Project Not Found</h1>
        <Link
          to="/"
          data-cursor="link"
          className="font-mono text-sm uppercase tracking-wider text-[#a855f7] underline"
        >
          Return to Portfolio
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f0eb] pt-28 md:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/10">
          <Magnetic strength={0.3} dataCursor="magnetic">
            <button
              onClick={() => navigate('/')}
              data-cursor="link"
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#8c8c88] hover:text-[#a855f7] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back To Selected Works</span>
            </button>
          </Magnetic>

          <span className="font-mono text-xs text-[#8c8c88]">
            {project.category} &bull; {project.year}
          </span>
        </div>

        {/* Project Hero Header */}
        <div className="py-6 md:py-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7] block mb-3">
            Case Study // 0{currentIndex + 1}
          </span>

          <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#f2f0eb] uppercase mb-4">
            {project.title}
          </h1>

          <p className="font-sans text-xl sm:text-2xl text-[#8c8c88] max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Shared Element Image Container with motion layoutId */}
        <div className="relative aspect-16/9 rounded-2xl overflow-hidden my-8 md:my-14 border border-white/10 bg-[#121212]">
          <motion.img
            layoutId={`project-image-${project.slug}`}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>

        {/* Project Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-white/10 font-mono text-xs">
          <div>
            <span className="text-[#8c8c88] uppercase tracking-wider block mb-1">Role</span>
            <span className="text-[#f2f0eb] font-sans font-medium">{project.role}</span>
          </div>

          <div>
            <span className="text-[#8c8c88] uppercase tracking-wider block mb-1">Timeline</span>
            <span className="text-[#f2f0eb] font-sans font-medium">{project.year}</span>
          </div>

          <div>
            <span className="text-[#8c8c88] uppercase tracking-wider block mb-1">Client / Domain</span>
            <span className="text-[#f2f0eb] font-sans font-medium">{project.client || 'Commercial Project'}</span>
          </div>

          <div>
            <span className="text-[#8c8c88] uppercase tracking-wider block mb-1">Direct Channels</span>
            <div className="flex items-center gap-4 mt-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="text-[#a855f7] hover:underline flex items-center gap-1"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="text-[#8c8c88] hover:text-[#f2f0eb] flex items-center gap-1"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            </div>
          </div>
        </div>

        {/* Deep Dive & Architecture Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#8c8c88]">
              Overview &amp; Problem Statement
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#f2f0eb] leading-relaxed">
              {project.description}
            </p>

            <div className="pt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8c8c88] block mb-3">
                Full Stack &amp; Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/5 font-mono text-xs text-[#f2f0eb]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            {/* Highlights */}
            <div className="rounded-2xl border border-white/10 bg-[#121212]/60 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6 text-[#a855f7]">
                <Cpu className="w-5 h-5" />
                <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                  Architectural Breakthroughs
                </h3>
              </div>

              <div className="space-y-4">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#a855f7] flex-shrink-0 mt-1" />
                    <span className="font-sans text-sm sm:text-base text-[#f2f0eb]/90 leading-relaxed">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Details */}
            <div className="rounded-2xl border border-white/10 bg-[#121212]/60 p-6 sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#8c8c88] mb-4">
                Systems Architecture Blueprint
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#8c8c88] leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>
        </div>

        {/* Next Project Bottom Banner */}
        {nextProject && (
          <div className="mt-16 pt-16 border-t border-white/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8c8c88] block mb-4">
              Explore Next Case Study
            </span>

            <Link
              to={`/work/${nextProject.slug}`}
              data-cursor="view"
              data-cursor-label="NEXT"
              className="group block rounded-2xl border border-white/10 bg-[#121212]/60 p-8 sm:p-12 transition-all duration-500 hover:border-[#a855f7]/50 hover:bg-[#141414]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="font-mono text-xs text-[#a855f7] mb-2 block">
                    {nextProject.category} &bull; {nextProject.year}
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl font-bold text-[#f2f0eb] group-hover:text-[#a855f7] transition-colors">
                    {nextProject.title}
                  </h3>
                  <p className="font-mono text-xs text-[#8c8c88] mt-1">
                    {nextProject.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#a855f7] group-hover:translate-x-2 transition-transform">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
