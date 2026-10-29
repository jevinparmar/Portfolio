import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Magnetic } from '../components/motion/Magnetic'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#0a0a0a] text-[#f2f0eb]">
      <div className="font-mono text-xs uppercase tracking-widest text-[#a855f7] mb-4">
        Error 404 // Coordinate Not Found
      </div>
      <h1 className="font-display font-extrabold text-7xl sm:text-9xl tracking-tighter text-[#f2f0eb] mb-6">
        VOID
      </h1>
      <p className="font-sans text-sm sm:text-base text-[#8c8c88] max-w-md mb-8">
        The requested digital module does not exist or has been relocated to another sector.
      </p>

      <Magnetic strength={0.3} dataCursor="magnetic">
        <Link
          to="/"
          data-cursor="link"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#f2f0eb] hover:border-[#a855f7] hover:text-[#a855f7] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Mainframe</span>
        </Link>
      </Magnetic>
    </div>
  )
}
