import { useEffect, useRef, useState } from 'react'
import { activeVantaFogConfig } from '../../config/vantaFogConfig'

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isCancelled = false

    // Helper to dynamically load a script if not already present
    const loadScript = (src: string, checkGlobal: () => boolean): Promise<void> => {
      if (checkGlobal()) return Promise.resolve()

      return new Promise((resolve, reject) => {
        // Check if script tag already exists
        const existingScript = document.querySelector(`script[src="${src}"]`)
        if (existingScript) {
          if (checkGlobal()) return resolve()
          existingScript.addEventListener('load', () => resolve())
          existingScript.addEventListener('error', (err) => reject(err))
          return
        }

        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.head.appendChild(script)
      })
    }

    const initVanta = async () => {
      try {
        // 1. Ensure Three.js is loaded
        await loadScript('/vendor/three.r134.min.js', () => typeof window !== 'undefined' && !!window.THREE)
        
        // 2. Ensure Vanta Fog is loaded
        await loadScript('/vendor/vanta.fog.min.js', () => typeof window !== 'undefined' && !!window.VANTA?.FOG)

        if (isCancelled || !vantaRef.current) return

        // 3. Initialize Vanta Fog effect
        if (window.VANTA && window.VANTA.FOG && !effectRef.current) {
          effectRef.current = window.VANTA.FOG({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: activeVantaFogConfig.highlightColor,
            midtoneColor: activeVantaFogConfig.midtoneColor,
            lowlightColor: activeVantaFogConfig.lowlightColor,
            baseColor: activeVantaFogConfig.baseColor,
            blurFactor: activeVantaFogConfig.blurFactor,
            zoom: activeVantaFogConfig.zoom,
            speed: activeVantaFogConfig.speed,
          })
          setIsLoaded(true)
        }
      } catch (err) {
        console.warn('Vanta Fog initialization skipped or failed:', err)
      }
    }

    initVanta()

    return () => {
      isCancelled = true
      if (effectRef.current) {
        try {
          effectRef.current.destroy()
        } catch {
          // ignore cleanup error
        }
        effectRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={vantaRef}
      id="vanta-fog-bg"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-opacity duration-1000"
      style={{
        opacity: isLoaded ? (activeVantaFogConfig.opacity ?? 0.95) : 0,
      }}
    />
  )
}
