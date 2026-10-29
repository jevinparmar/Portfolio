import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowUpRight, Mail } from 'lucide-react'
import { Magnetic } from '../motion/Magnetic'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/SocialIcons'
import { useLiveTime } from '../../hooks/useLiveTime'
import { DownloadCV } from '../ui/DownloadCV'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (sectionId: string) => void
}

const MENU_LINKS = [
  { id: 'work', label: 'Selected Work', index: '01' },
  { id: 'about', label: 'About & Philosophy', index: '02' },
  { id: 'skills', label: 'Core Competence', index: '03' },
  { id: 'experience', label: 'Career Trajectory', index: '04' },
  { id: 'contact', label: "Let's Connect", index: '05' },
]

export function FullscreenMenu({ isOpen, onClose, onNavigate }: FullscreenMenuProps) {
  const liveTime = useLiveTime()

  // Prevent background scroll when menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = (id: string) => {
    onClose()
    onNavigate(id)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          data-cursor="menu"
          data-cursor-label="CLOSE"
          onClick={(e) => {
            // Close when clicking directly on overlay background
            if (e.target === e.currentTarget) onClose()
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0e0e0e] text-[#f2f0eb] px-6 py-8 md:px-16 md:py-12"
        >
          {/* Top Header inside Menu */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#8c8c88]">
                Navigation Matrix
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="hidden md:inline font-mono text-xs text-[#8c8c88]">
                IST {liveTime} &bull; India
              </span>
              <Magnetic strength={0.4} dataCursor="magnetic">
                <button
                  onClick={onClose}
                  data-cursor="link"
                  data-cursor-label="CLOSE"
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#f2f0eb] transition-colors hover:border-[#a855f7] hover:text-[#a855f7]"
                  aria-label="Close Navigation"
                >
                  <X className="w-4 h-4" />
                  <span>CLOSE</span>
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Center Links List */}
          <div className="flex flex-col justify-center my-auto py-8">
            <nav className="flex flex-col space-y-3 md:space-y-4">
              {MENU_LINKS.map((link, idx) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                  className="group relative flex items-baseline gap-4 md:gap-8 border-b border-white/5 pb-2"
                >
                  <span className="font-mono text-xs md:text-sm text-[#8c8c88] group-hover:text-[#a855f7] transition-colors">
                    {link.index}
                  </span>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    data-cursor="link"
                    className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#f2f0eb] transition-all duration-300 group-hover:translate-x-4 group-hover:text-[#a855f7] text-left"
                  >
                    {link.label}
                  </button>
                  <ArrowUpRight className="hidden sm:inline w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 -translate-y-2 text-[#a855f7] transition-all duration-300" />
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Placement D: Download CV inside fullscreen mobile menu */}
          <div className="py-4">
            <DownloadCV variant="menu" />
          </div>

          {/* Bottom Footer Info inside Menu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono text-xs">
            <div>
              <p className="text-[#8c8c88] uppercase tracking-wider mb-1">Status</p>
              <p className="text-[#a855f7] flex items-center gap-1.5 font-sans">
                <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
                Available for Senior Roles &amp; High-Impact Projects
              </p>
            </div>

            <div>
              <p className="text-[#8c8c88] uppercase tracking-wider mb-1">Coordinates</p>
              <p className="text-[#f2f0eb] font-sans">
                India (UTC+5:30) &bull; Worldwide Remote
              </p>
            </div>

            <div className="flex items-center gap-4 md:justify-end">
              <a
                href="https://github.com/jevinparmar"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="p-2 text-[#8c8c88] hover:text-[#a855f7] transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/jevinparmar"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="p-2 text-[#8c8c88] hover:text-[#a855f7] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/jevinparmar"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="p-2 text-[#8c8c88] hover:text-[#a855f7] transition-colors"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@jevinparmar.dev"
                data-cursor="link"
                className="p-2 text-[#8c8c88] hover:text-[#a855f7] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
