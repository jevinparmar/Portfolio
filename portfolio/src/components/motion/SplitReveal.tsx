import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'

interface SplitRevealProps {
  text: string
  className?: string
  charClassName?: string
  delay?: number
  stagger?: number
  duration?: number
  by?: 'chars' | 'words'
}

export function SplitReveal({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.035,
  duration = 1.1,
  by = 'chars'
}: SplitRevealProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const targets = containerRef.current.querySelectorAll('.split-item-inner')
    if (targets.length === 0) return

    gsap.fromTo(
      targets,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'expo.out'
      }
    )
  }, { scope: containerRef, dependencies: [text, delay, stagger, duration] })

  if (by === 'words') {
    const words = text.split(' ')
    return (
      <div ref={containerRef as React.RefObject<HTMLDivElement>} className={`inline-flex flex-wrap gap-x-3 ${className}`}>
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden pb-1">
            <span className={`split-item-inner inline-block will-change-transform ${charClassName}`}>
              {word}
            </span>
          </span>
        ))}
      </div>
    )
  }

  // Split by characters with word wrappers to preserve spacing without clipping
  const words = text.split(' ')

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className={`inline-flex flex-nowrap whitespace-nowrap gap-x-[0.25em] ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex flex-nowrap whitespace-nowrap overflow-hidden pb-1 pr-[0.05em]">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="inline-block overflow-hidden">
              <span className={`split-item-inner inline-block will-change-transform ${charClassName}`}>
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}
