import { useState, useEffect, useRef } from 'react'

export default function Viewport({ 
  currentUrl, 
  isBlurActive, 
  isProtanopiaActive, 
  isTritanopiaActive, 
  isLowContrastActive, 
  isTunnelVisionActive, 
  isAchromatopsiaActive 
}) {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' })
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isTunnelVisionActive || !containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2)
      const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2)
      
      setMousePos({ x: `${x}%`, y: `${y}%` })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isTunnelVisionActive])

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col bg-slate-950 relative">
      {/* Viewport URL Top Bar */}
      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 select-none">
        <span className="truncate">Viewing Frame: <strong className="text-white font-medium">{currentUrl}</strong></span>
        <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">SECURE_SANDBOX</span>
      </div>

      {/* Interactive Testing Canvas Window */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-white">
        
        {/* CSS SIMULATION FILTERS LAYER */}
        <div 
          className="absolute inset-0 pointer-events-none z-30 transition-all duration-200"
          style={{
            backdropFilter: `
              ${isBlurActive ? 'blur(4px)' : 'blur(0px)'}
            `,
            filter: `
              ${isProtanopiaActive ? 'url(#protanopia-filter)' : ''}
              ${isTritanopiaActive ? 'url(#tritanopia-filter)' : ''}
              ${isAchromatopsiaActive ? 'grayscale(100%)' : ''}
              ${isLowContrastActive ? 'contrast(45%) brightness(110%)' : ''}
            `
          }}
        />

        {/* Dynamic Tracking Tunnel Vision Overlay Layer */}
        {isTunnelVisionActive && (
          <div 
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background: `radial-gradient(circle 100px at ${mousePos.x} ${mousePos.y}, transparent 0%, rgba(15, 23, 42, 0.98) 100%)`
            }}
          />
        )}

        {/* TARGET LIVE SITE FRAME */}
        <iframe 
          src={currentUrl} 
          title="Accessibility Target Viewport"
          className={`w-full h-full border-none bg-white relative z-10 ${isTunnelVisionActive ? 'pointer-events-none' : 'pointer-events-auto'}`}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>

      {/* SVG Blindness Shaders Registry Matrix */}
      <svg className="absolute w-0 h-0 aria-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}