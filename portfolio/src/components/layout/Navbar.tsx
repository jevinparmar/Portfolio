import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Magnetic } from '../motion/Magnetic'
import { FullscreenMenu } from './FullscreenMenu'
import { getLenis } from '../../hooks/useLenis'
import { DownloadCV } from '../ui/DownloadCV'

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if scrolled past initial threshold
      if (currentScrollY > 80) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      const lenis = getLenis()
      if (lenis) {
        lenis.scrollTo(el, { offset: -40, duration: 1.4 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[990] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'py-3' : 'py-6 md:py-8'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? 'glass-pill rounded-full px-5 py-2.5 shadow-xl shadow-black/40 border border-white/10'
                : 'bg-transparent px-2'
            }`}
          >
            {/* Brand Monogram & Name */}
            <Magnetic strength={0.25} dataCursor="magnetic">
              <button
                data-cursor="link"
                onClick={() => {
                  const lenis = getLenis()
                  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
                  else window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="group flex items-center gap-3 text-left focus:outline-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center font-display font-bold text-xs text-[#a855f7] group-hover:bg-[#a855f7] group-hover:text-white transition-all duration-300">
                  JP
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-[#f2f0eb]">
                    Jevin Parmar
                  </span>
                  <span className="hidden sm:inline-block font-mono text-[10px] text-[#8c8c88] tracking-widest uppercase">
                    Software Developer
                  </span>
                </div>
              </button>
            </Magnetic>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {[
                { label: 'Work', id: 'work' },
                { label: 'About', id: 'about' },
                { label: 'Skills', id: 'skills' },
                { label: 'Experience', id: 'experience' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <Magnetic key={item.id} strength={0.3} dataCursor="magnetic">
                  <button
                    data-cursor="link"
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-[#8c8c88] transition-colors duration-200 hover:text-[#f2f0eb]"
                  >
                    {item.label}
                  </button>
                </Magnetic>
              ))}
            </nav>

            {/* Action Buttons: Download CV Pill, Magnetic CTA & Menu Toggle */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Placement A: Download CV pill in navbar */}
              <DownloadCV variant="pill" />

              <Magnetic strength={0.35} dataCursor="magnetic">
                <button
                  data-cursor="link"
                  data-cursor-label="TALK"
                  onClick={() => scrollToSection('contact')}
                  className="hidden sm:flex items-center gap-2 rounded-full border border-[#a855f7]/40 bg-[#a855f7]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#a855f7] transition-all duration-300 hover:bg-[#a855f7] hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] group-hover:bg-white" />
                  <span>Let's Talk</span>
                </button>
              </Magnetic>

              <Magnetic strength={0.3} dataCursor="magnetic">
                <button
                  data-cursor="link"
                  onClick={() => setIsMenuOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[#f2f0eb] transition-colors hover:border-[#a855f7]/40 hover:text-[#a855f7]"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="w-4 h-4" />
                  <span className="hidden sm:inline">Menu</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  )
}
