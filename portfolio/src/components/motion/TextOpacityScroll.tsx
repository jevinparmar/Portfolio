import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'

interface TextOpacityScrollProps {
  text: string
  className?: string
  highlightWords?: string[]
}

export function TextOpacityScroll({
  text,
  className = '',
  highlightWords = []
}: TextOpacityScrollProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const words = containerRef.current.querySelectorAll('.scroll-word')
    if (words.length === 0) return

    gsap.fromTo(
      words,
      { opacity: 0.2 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 55%',
          scrub: 0.8,
        }
      }
    )
  }, { scope: containerRef, dependencies: [text] })

  const words = text.split(' ')

  return (
    <p ref={containerRef} className={`leading-relaxed font-sans ${className}`}>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        const isHighlight = highlightWords.some(hw => hw.toLowerCase() === cleanWord)

        return (
          <span
            key={i}
            className={`scroll-word inline-block mr-[0.3em] transition-colors duration-200 ${
              isHighlight ? 'text-[#a855f7] font-semibold' : 'text-[#f2f0eb]'
            }`}
          >
            {word}
          </span>
        )
      })}
    </p>
  )
}
