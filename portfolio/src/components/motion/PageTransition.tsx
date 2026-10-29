import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { getLenis } from '../../hooks/useLenis'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  useEffect(() => {
    // Reset Lenis scroll to top immediately on route change
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="w-full relative"
    >
      {children}
    </motion.div>
  )
}
