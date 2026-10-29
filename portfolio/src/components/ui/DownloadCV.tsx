import { useState } from 'react'
import { ArrowDown, Check, FileText } from 'lucide-react'
import { Magnetic } from '../motion/Magnetic'

interface DownloadCVProps {
  variant?: 'pill' | 'button' | 'menu'
  className?: string
  showHint?: boolean
}

export function DownloadCV({
  variant = 'button',
  className = '',
  showHint = true,
}: DownloadCVProps) {
  const [downloaded, setDownloaded] = useState(false)

  const handleClick = () => {
    setDownloaded(true)
    setTimeout(() => {
      setDownloaded(false)
    }, 1500)
  }

  if (variant === 'pill') {
    return (
      <Magnetic strength={0.3} dataCursor="magnetic">
        <a
          href="/cv/Jevin-Parmar-Resume.pdf"
          download="Jevin-Parmar-Resume.pdf"
          rel="noopener"
          onClick={handleClick}
          data-cursor="link"
          data-cursor-label="CV"
          aria-label="Download resume as PDF (PDF, 75 KB)"
          className={`group relative inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#f2f0eb] transition-all duration-300 hover:border-[#a855f7] hover:bg-[#a855f7]/10 hover:text-[#a855f7] focus-visible:outline-2 focus-visible:outline-[#a855f7] ${className}`}
        >
          {downloaded ? (
            <Check className="w-3.5 h-3.5 text-[#a855f7] animate-bounce" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          )}
          <span className="relative overflow-hidden h-[15px] flex flex-col justify-start">
            <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
              CV
            </span>
            <span className="absolute top-full left-0 text-[#a855f7] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
              PDF
            </span>
          </span>
        </a>
      </Magnetic>
    )
  }

  if (variant === 'menu') {
    return (
      <Magnetic strength={0.35} dataCursor="magnetic">
        <a
          href="/cv/Jevin-Parmar-Resume.pdf"
          download="Jevin-Parmar-Resume.pdf"
          rel="noopener"
          onClick={handleClick}
          data-cursor="link"
          data-cursor-label="CV"
          aria-label="Download resume as PDF (PDF, 75 KB)"
          className={`group flex items-center justify-between w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-xs uppercase tracking-wider text-[#f2f0eb] transition-all duration-300 hover:border-[#a855f7]/50 hover:bg-[#a855f7]/5 ${className}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#a855f7] group-hover:bg-[#a855f7] group-hover:text-black transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans font-bold text-sm text-[#f2f0eb] group-hover:text-[#a855f7] transition-colors">
                Resume / Curriculum Vitae
              </p>
              <span className="text-[10px] text-[#8c8c88]">PDF, 75 KB &bull; Verified 2026</span>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#a855f7] group-hover:text-[#a855f7] transition-colors">
            {downloaded ? (
              <Check className="w-3.5 h-3.5 text-[#a855f7]" />
            ) : (
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            )}
          </div>
        </a>
      </Magnetic>
    )
  }

  // Default large button variant
  return (
    <Magnetic strength={0.35} dataCursor="magnetic">
      <a
        href="/cv/Jevin-Parmar-Resume.pdf"
        download="Jevin-Parmar-Resume.pdf"
        rel="noopener"
        onClick={handleClick}
        data-cursor="link"
        data-cursor-label="CV"
        aria-label="Download resume as PDF (PDF, 75 KB)"
        className={`group relative inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#f2f0eb] transition-all duration-300 hover:border-[#a855f7] hover:bg-[#a855f7]/10 hover:text-[#a855f7] focus-visible:outline-2 focus-visible:outline-[#a855f7] ${className}`}
      >
        <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-[#a855f7]/20 transition-colors">
          {downloaded ? (
            <Check className="w-3.5 h-3.5 text-[#a855f7] animate-pulse" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-[#a855f7]" />
          )}
        </span>

        {/* Text roll effect */}
        <span className="relative overflow-hidden h-[18px] flex flex-col justify-start">
          <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
            Download CV
          </span>
          <span className="absolute top-full left-0 text-[#a855f7] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
            Get the PDF
          </span>
        </span>

        {showHint && (
          <span className="font-mono text-[10px] text-[#8c8c88] border-l border-white/15 pl-2.5 transition-colors group-hover:text-[#f2f0eb]">
            PDF, 75 KB
          </span>
        )}
      </a>
    </Magnetic>
  )
}
