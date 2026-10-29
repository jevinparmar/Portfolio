import { useState } from 'react'
import { ArrowUp, Copy, Check, Mail, Globe2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { Magnetic } from '../motion/Magnetic'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/SocialIcons'
import { useLiveTime } from '../../hooks/useLiveTime'
import { getLenis } from '../../hooks/useLenis'
import { ContactForm } from '../sections/Contact/ContactForm'

export function Footer() {
  const [copied, setCopied] = useState(false)
  const liveTime = useLiveTime()

  const EMAIL = 'contact@jevinparmar.dev'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#a855f7', '#c084fc', '#f2f0eb', '#7e22ce']
    })

    setTimeout(() => setCopied(false), 2500)
  }

  const handleBackToTop = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer
      id="contact"
      className="relative bg-[#070707] text-[#f2f0eb] pt-24 md:pt-36 pb-12 overflow-hidden border-hairline-t"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#a855f7]/8 blur-[160px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Index Header */}
        <div className="flex items-center justify-between mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7]">
              // 05
            </span>
            <span className="h-[1px] w-8 bg-[#a855f7]/40" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#8c8c88]">
              Initiate Dialogue
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8c8c88]">
            <Globe2 className="w-3.5 h-3.5 text-[#a855f7]" />
            <span>IST {liveTime} &bull; INDIA</span>
          </div>
        </div>

        {/* Kinetic LET'S TALK & Editorial Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start py-8 md:py-16">
          {/* Left Column: Direct Outreach & Giant Kinetic Typography */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#8c8c88] mb-4">
                Have a project in mind or looking for a senior developer?
              </p>

              <a
                href={`mailto:${EMAIL}`}
                data-cursor="link"
                data-cursor-label="TALK"
                className="group block relative font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tighter uppercase text-[#f2f0eb] hover:text-[#a855f7] transition-colors duration-300"
              >
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  LET'S TALK
                </span>
                <span className="inline-block text-[#a855f7] ml-2 animate-bounce">
                  .
                </span>
              </a>
            </div>

            <p className="font-sans text-base text-[#8c8c88] leading-relaxed max-w-md">
              Whether you need end-to-end full stack architecture, performance optimization, or cinematic micro-interactions, drop a message or reach out directly.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Magnetic strength={0.25} dataCursor="magnetic">
                  <button
                    onClick={handleCopyEmail}
                    data-cursor="link"
                    data-cursor-label="COPY"
                    className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#f2f0eb] transition-all duration-300 hover:border-[#a855f7] hover:bg-[#a855f7]/10"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#a855f7]" />
                        <span className="text-[#a855f7]">Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#8c8c88] group-hover:text-[#a855f7]" />
                        <span>{EMAIL}</span>
                      </>
                    )}
                  </button>
                </Magnetic>

                <span className="font-mono text-xs text-[#8c8c88]">
                  Direct inbox response &lt;24h
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 font-mono text-xs pt-4">
                <Magnetic strength={0.3} dataCursor="magnetic">
                  <a
                    href="https://github.com/jevinparmar"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[#8c8c88] transition-all duration-200 hover:border-[#a855f7]/50 hover:text-[#a855f7]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.3} dataCursor="magnetic">
                  <a
                    href="https://linkedin.com/in/jevinparmar"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[#8c8c88] transition-all duration-200 hover:border-[#a855f7]/50 hover:text-[#a855f7]"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.3} dataCursor="magnetic">
                  <a
                    href="https://x.com/jevinparmar"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[#8c8c88] transition-all duration-200 hover:border-[#a855f7]/50 hover:text-[#a855f7]"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" />
                    <span>Twitter / X</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.3} dataCursor="magnetic">
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="link"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[#8c8c88] transition-all duration-200 hover:border-[#a855f7]/50 hover:text-[#a855f7]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Mail</span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#101010]/85 p-6 sm:p-10 md:p-12 backdrop-blur-md">
            <div className="mb-8 pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7] block mb-1">
                  // TRANSMISSION TERMINAL
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f2f0eb]">
                  Send a Direct Inquiry
                </h3>
              </div>
              <span className="font-mono text-[11px] text-[#8c8c88]">
                EST. RESPONSE: &lt;24H
              </span>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* Bottom Colophon & Back-To-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#8c8c88]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Jevin Parmar.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Crafted with React 18, GSAP, Lenis &amp; Motion.</span>
          </div>

          <Magnetic strength={0.3} dataCursor="magnetic">
            <button
              onClick={handleBackToTop}
              data-cursor="link"
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 uppercase tracking-wider text-[#f2f0eb] transition-all duration-300 hover:border-[#a855f7] hover:text-[#a855f7]"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
