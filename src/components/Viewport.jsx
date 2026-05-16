import { useState, useRef } from 'react'

export default function Viewport({ 
  currentUrl, 
  isBlurActive, 
  isProtanopiaActive, 
  isTritanopiaActive, 
  isLowContrastActive,
  isTunnelVisionActive,
  isAchromatopsiaActive
}) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    if (!isTunnelVisionActive || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    
    // Calculate raw relative pixels inside the viewport container bounding rect
    const relativeX = e.clientX - rect.left
    const relativeY = e.clientY - rect.top

    // Clamp values strictly between 0% and 100% so the tunnel doesn't break at borders
    const xPct = Math.max(0, Math.min(100, (relativeX / rect.width) * 100))
    const yPct = Math.max(0, Math.min(100, (relativeY / rect.height) * 100))

    setMousePos({ x: xPct, y: yPct })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 50, y: 50 })
  }

  // Compile active CSS filters
  const filterStyles = []
  if (isBlurActive) filterStyles.push('blur(4px)')
  if (isProtanopiaActive) filterStyles.push('url(#protanopia)')
  if (isTritanopiaActive) filterStyles.push('url(#tritanopia)')
  if (isAchromatopsiaActive) filterStyles.push('url(#achromatopsia)')
  if (isLowContrastActive) filterStyles.push('contrast(45%) brightness(115%)')

  return (
    <div className="flex-1 p-4 lg:p-6 bg-slate-950 overflow-auto flex items-center justify-center">
      {/* STATIC TRACKING STATION */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full max-w-6xl bg-black rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden"
      >
        
        {/* IFRAME WORKSPACE (Isolated styling to prevent event bubble jumping) */}
        <iframe 
          src={currentUrl} 
          title="Live Accessibility Simulation Sandbox Viewport"
          className="w-full h-full border-none bg-white select-none"
          style={{ 
            filter: filterStyles.length > 0 ? filterStyles.join(' ') : 'none',
            // Prevents the iframe from stealing mouse focus while dragging across the screen
            pointerEvents: isTunnelVisionActive ? 'none' : 'auto' 
          }}
        />

        {/* STATIC SHADER MASK OVERLAY (Completely non-interactive to mouse pointer) */}
        {isTunnelVisionActive && (
          <div 
            className="absolute inset-0 pointer-events-none select-none mix-blend-normal"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, transparent 8%, rgba(0, 0, 0, 0.98) 18%)`
            }}
          />
        )}

        {/* METRICS CONTROL ROOM */}
        <div className="absolute bottom-4 right-4 flex flex-wrap gap-1.5 max-w-md justify-end pointer-events-none select-none" role="status">
          {isBlurActive && <div className="bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-yellow-400 text-[9px] font-mono px-2 py-0.5 rounded">BLUR</div>}
          {isProtanopiaActive && <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-400 text-[9px] font-mono px-2 py-0.5 rounded">PROTANOPIA</div>}
          {isTritanopiaActive && <div className="bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 text-cyan-400 text-[9px] font-mono px-2 py-0.5 rounded">TRITANOPIA</div>}
          {isAchromatopsiaActive && <div className="bg-slate-500/20 backdrop-blur-md border border-slate-700 text-slate-300 text-[9px] font-mono px-2 py-0.5 rounded">MONOCHROME</div>}
          {isLowContrastActive && <div className="bg-purple-500/10 backdrop-blur-md border border-purple-500/20 text-purple-400 text-[9px] font-mono px-2 py-0.5 rounded">CONTRAST LOSS</div>}
          {isTunnelVisionActive && <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded">LOCK-ON TUNNEL</div>}
        </div>
      </div>
    </div>
  )
}