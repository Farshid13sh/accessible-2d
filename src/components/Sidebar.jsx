import { useState, useRef, useEffect } from 'react'

export default function Sidebar({ 
  isOpen, 
  setIsOpen, 
  isBlurActive, 
  setIsBlurActive, 
  isProtanopiaActive,
  setIsProtanopiaActive,
  isTritanopiaActive,
  setIsTritanopiaActive,
  isLowContrastActive,
  setIsLowContrastActive,
  isTunnelVisionActive,
  setIsTunnelVisionActive,
  isAchromatopsiaActive,
  setIsAchromatopsiaActive,
  urlInput, 
  setUrlInput, 
  onUrlSubmit,
  currentView,
  setCurrentView
}) {
  const [modalData, setModalData] = useState(null)
  const modalRef = useRef(null)
  const triggerRef = useRef(null)

  const infoProfiles = {
    blur: {
      title: "Far-Sightedness (Presbyopia / Focal Blur)",
      stats: "Affects over 826 million people globally according to the WHO. It scales inherently with age as biological lenses drop functional accommodation flex.",
      remedy: "Enforce relative type sizes (rem) instead of fixed pixels, keep geometric stroke weights sturdy, and use distinct border lines for card layouts.",
      source: "WHO World Report on Vision",
      link: "https://www.who.int/publications/i/item/9789241516570"
    },
    protanopia: {
      title: "Protanopia (Red-Cone Deficiency)",
      stats: "Affects approximately 1% of the male demographic globally. Cones processing long-wavelength red spectrum markers are entirely missing.",
      remedy: "Never rely on raw red/green variations alone to indicate text warnings or valid states. Always accompany colors with distinct shape forms or clear warning labels.",
      source: "W3C WCAG 2.2 Visual Guidelines",
      link: "https://www.w3.org/WAI/WCAG22/Techniques/general/G14"
    },
    tritanopia: {
      title: "Tritanopia (Blue-Yellow Deficiency)",
      stats: "Extremely sparse variant, occurring in fewer than 1 in 10,000 individuals worldwide. Short-wavelength blue processing cones are missing.",
      remedy: "Do not build structural actions using narrow blue vs. green or purple vs. pink contrast systems for buttons or data dashboards.",
      source: "NIH National Eye Institute Datasets",
      link: "https://www.nih.gov/"
    },
    contrast: {
      title: "Low Contrast Sensitivity (Environmental Glare & Pathological)",
      stats: "Affects millions navigating cataracts, alongside billions of mobile screen users viewing interfaces outdoors under direct sunlight glare.",
      remedy: "Ensure contrast metrics hit a 4.5:1 ratio threshold for common running body copy and 3:1 for decorative block components.",
      source: "WebAIM Contrast Fundamentals Documentation",
      link: "https://webaim.org/articles/contrast/"
    },
    tunnel: {
      title: "Tunnel Vision (Peripheral Vision Loss)",
      stats: "Prevalent in advanced glaucoma or retinitis pigmentosa. Central vision field is constrained to less than 20 degrees, blocking peripheral awareness.",
      remedy: "Keep contextual system alerts, notifications, and form error feedback messages localized immediately near the action buttons that triggered them rather than throwing them to far outer corners.",
      source: "W3C Cognitive & Vision Patterns",
      link: "https://www.w3.org/WAI/people-use-web/abilities/#vision"
    },
    achromatopsia: {
      title: "Total Achromatopsia (Complete Monochromacy)",
      stats: "Affects roughly 1 in 30,000 people. Total inability to process any color spectrum frequencies, rendering the world completely in grayscale.",
      remedy: "Establish layout readability completely through luminance, shape definitions, texture variations, typography hierarchies, and extreme light/dark layout value shifts.",
      source: "W3C Understanding Conformance Metrics",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"
    }
  }

  const openModal = (type, e) => {
    triggerRef.current = e.currentTarget
    setModalData(infoProfiles[type])
  }

  const closeModal = () => {
    setModalData(null)
    if (triggerRef.current) triggerRef.current.focus()
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    if (modalData) {
      window.addEventListener('keydown', handleKeyDown)
      modalRef.current?.focus()
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalData])

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside 
        id="control-sidebar"
        aria-label="Application Control Panel"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-900 p-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-yellow-500 italic">AccessiLab 2D</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Workspace Mode</p>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close controls sidebar" className="rounded-lg p-1.5 hover:bg-slate-800 lg:hidden text-slate-400 hover:text-white">✕</button>
        </div>

        <nav aria-label="Workspace Views" className="mt-6">
          <div role="tablist" className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800/80">
            <button type="button" role="tab" aria-selected={currentView === 'workspace'} onClick={() => setCurrentView('workspace')} className={`py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none ${currentView === 'workspace' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Sandbox</button>
            <button type="button" role="tab" aria-selected={currentView === 'research'} onClick={() => setCurrentView('research')} className={`py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none ${currentView === 'research' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Research</button>
          </div>
        </nav>

        {currentView === 'workspace' && (
          <form onSubmit={onUrlSubmit} className="mt-6 space-y-2">
            <label htmlFor="url-sandbox-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Test Live Site</label>
            <div className="flex gap-2">
              <input id="url-sandbox-input" type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="e.g., example.com" aria-required="true" />
              <button type="submit" aria-label="Load website" className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium hover:bg-blue-500 transition-colors">Go</button>
            </div>
          </form>
        )}

        <div className="mt-8 flex-1 space-y-6 overflow-y-auto pr-1 select-none">
          {currentView === 'workspace' ? (
            <section aria-label="Impairment Simulators">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-3">Impairment Modifiers</h2>
              
              <div className="space-y-3">
                
                {/* 1. BLUR */}
                <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <p id="lbl-blur" className="text-xs font-semibold text-slate-200">Far-Sightedness</p>
                      <button type="button" onClick={(e) => openModal('blur', e)} aria-label="Info" className="text-slate-500 hover:text-blue-400 text-xs px-0.5">ⓘ</button>
                    </div>
                  </div>
                  <button type="button" role="switch" aria-checked={isBlurActive} aria-labelledby="lbl-blur" onClick={() => setIsBlurActive(!isBlurActive)} className={`relative inline-flex h-4 w-8 shrink-0 rounded-full transition-colors ${isBlurActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isBlurActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* 2. PROTANOPIA */}
                <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <p id="lbl-protan" className="text-xs font-semibold text-slate-200">Protanopia</p>
                      <button type="button" onClick={(e) => openModal('protanopia', e)} aria-label="Info" className="text-slate-500 hover:text-blue-400 text-xs px-0.5">ⓘ</button>
                    </div>
                  </div>
                  <button type="button" role="switch" aria-checked={isProtanopiaActive} aria-labelledby="lbl-protan" onClick={() => setIsProtanopiaActive(!isProtanopiaActive)} className={`relative inline-flex h-4 w-8 shrink-0 rounded-full transition-colors ${isProtanopiaActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isProtanopiaActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* 3. TRITANOPIA */}
                <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <p id="lbl-tritan" className="text-xs font-semibold text-slate-200">Tritanopia</p>
                      <button type="button" onClick={(e) => openModal('tritanopia', e)} aria-label="Info" className="text-slate-500 hover:text-blue-400 text-xs px-0.5">ⓘ</button>
                    </div>
                  </div>
                  <button type="button" role="switch" aria-checked={isTritanopiaActive} aria-labelledby="lbl-tritan" onClick={() => setIsTritanopiaActive(!isTritanopiaActive)} className={`relative inline-flex h-4 w-8 shrink-0 rounded-full transition-colors ${isTritanopiaActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isTritanopiaActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* 4. CONTRAST LOSS */}
                <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <p id="lbl-contrast" className="text-xs font-semibold text-slate-200">Contrast Loss</p>
                      <button type="button" onClick={(e) => openModal('contrast', e)} aria-label="Info" className="text-slate-500 hover:text-blue-400 text-xs px-0.5">ⓘ</button>
                    </div>
                  </div>
                  <button type="button" role="switch" aria-checked={isLowContrastActive} aria-labelledby="lbl-contrast" onClick={() => setIsLowContrastActive(!isLowContrastActive)} className={`relative inline-flex h-4 w-8 shrink-0 rounded-full transition-colors ${isLowContrastActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isLowContrastActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* 5. TUNNEL VISION */}
                <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <p id="lbl-tunnel" className="text-xs font-semibold text-slate-200">Tunnel Vision</p>
                      <button type="button" onClick={(e) => openModal('tunnel', e)} aria-label="Info" className="text-slate-500 hover:text-blue-400 text-xs px-0.5">ⓘ</button>
                    </div>
                  </div>
                  <button type="button" role="switch" aria-checked={isTunnelVisionActive} aria-labelledby="lbl-tunnel" onClick={() => setIsTunnelVisionActive(!isTunnelVisionActive)} className={`relative inline-flex h-4 w-8 shrink-0 rounded-full transition-colors ${isTunnelVisionActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isTunnelVisionActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* 6. ACHROMATOPSIA */}
                <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <p id="lbl-achro" className="text-xs font-semibold text-slate-200">Monochromacy</p>
                      <button type="button" onClick={(e) => openModal('achromatopsia', e)} aria-label="Info" className="text-slate-500 hover:text-blue-400 text-xs px-0.5">ⓘ</button>
                    </div>
                  </div>
                  <button type="button" role="switch" aria-checked={isAchromatopsiaActive} aria-labelledby="lbl-achro" onClick={() => setIsAchromatopsiaActive(!isAchromatopsiaActive)} className={`relative inline-flex h-4 w-8 shrink-0 rounded-full transition-colors ${isAchromatopsiaActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isAchromatopsiaActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

              </div>
            </section>
          ) : (
            <div className="text-xs text-slate-400 italic" role="status">Reviewing the quantitative baseline data regarding universal digital compliance.</div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono">system.status: tracking</div>
      </aside>

      {/* MODAL INFRASTRUCTURE */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div ref={modalRef} tabIndex="-1" className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 focus:outline-none">
            <div className="flex items-start justify-between">
              <h3 id="modal-title" className="text-sm font-bold text-white tracking-tight">{modalData.title}</h3>
              <button type="button" onClick={closeModal} aria-label="Close" className="text-slate-400 hover:text-white rounded-md p-1 hover:bg-slate-800 text-xs font-mono">✕</button>
            </div>
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-slate-950 border border-slate-800/60 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500 block mb-1">Empirical Metrics</span>
                <p>{modalData.stats}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-1">Engineering Remedies</span>
                <p>{modalData.remedy}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <a href={modalData.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-slate-400 hover:text-blue-400 underline">View Specification ↗</a>
              <button type="button" onClick={closeModal} className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-medium text-white">Dismiss</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}