import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

// Bespoke editorial easings
export const EASINGS = {
  expoOut: 'expo.out',
  expoInOut: 'expo.inOut',
  circOut: 'circ.out',
  power4Out: 'power4.out',
  smoothBezier: 'cubic-bezier(0.76, 0, 0.24, 1)',
}
