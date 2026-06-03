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

  // Contrast Calculator State Pipes (Scoped internally to the Sidebar utility)
  const [textColor, setTextColor] = useState('#3B82F6')
  const [bgColor, setBgColor] = useState('#0F172A')

  const infoProfiles = {
    blur: {
      title: "Far-Sightedness (Presbyopia / Focal Blur)",
      description: "An age-related condition where the eye's lens hardens and loses the flexibility needed to focus on close objects. Small text, dense UI labels, and fine detail become progressively blurry — especially on high-DPI or small screens.",
      stats: "Over 826 million people globally are affected by unaddressed presbyopia (WHO). It impacts nearly everyone over the age of 45, making it one of the most widespread visual conditions on the planet.",
      remedy: "Use relative font units (rem/em) instead of fixed pixels. Set a minimum body font size of 16px. Ensure all text and UI scales correctly with browser zoom up to 200% without overflow or content loss.",
      link: "https://www.who.int/publications/i/item/9789241516570"
    },
    protanopia: {
      title: "Protanopia (Red-Cone Deficiency)",
      description: "A form of red-green color blindness where the red-sensitive cone cells are absent or non-functional. Reds appear dark brown or black, and any distinction between red and green becomes invisible — affecting traffic lights, status indicators, and form error states.",
      stats: "Affects approximately 1% of males globally. Combined with Deuteranopia (green-blindness), red-green color blindness impacts around 8% of men and 0.5% of women worldwide — roughly 300 million people.",
      remedy: "Never use red vs. green alone to convey state (e.g. error vs. success). Always pair color with a distinct icon, label, or pattern. Use shapes and text to communicate meaning independently of hue.",
      link: "https://www.w3.org/WAI/WCAG22/Techniques/general/G14"
    },
    tritanopia: {
      title: "Tritanopia (Blue-Yellow Deficiency)",
      description: "A rare form of color blindness caused by absent or non-functional blue cone cells. Blues appear green, yellows shift to pink or violet, and blue-yellow contrasts become completely indistinguishable. Unlike red-green blindness, it can also be acquired through aging or eye disease.",
      stats: "Tritanopia occurs in fewer than 1 in 10,000 people worldwide, making it significantly rarer than red-green color blindness. Acquired forms are more common and increase with age.",
      remedy: "Avoid relying on blue vs. yellow or blue vs. green contrast alone to communicate information. Supplement all color-coded UI with labels, icons, or luminance differences that remain distinguishable in greyscale.",
      link: "https://www.nih.gov/"
    },
    contrast: {
      title: "Low Contrast Sensitivity",
      description: "A reduced ability to distinguish between elements when the luminance difference between foreground and background is low. Caused by cataracts, glaucoma, diabetic retinopathy, and normal aging. Also triggered situationally — bright sunlight on a phone screen, low-quality displays, or eye fatigue.",
      stats: "Over 253 million people globally live with vision impairment, with contrast sensitivity loss as a major component. Billions more experience situational contrast issues daily on mobile devices in poor lighting conditions.",
      remedy: "Meet the WCAG AA minimum of 4.5:1 contrast ratio for standard body text, and 3:1 for large text (18px+ bold or 24px+). Use the Luminance Calculator in this panel to verify color pairs before shipping.",
      link: "https://webaim.org/articles/contrast/"
    },
    tunnel: {
      title: "Tunnel Vision (Peripheral Vision Loss)",
      description: "A condition where only the central field of vision remains intact, eliminating all peripheral awareness. Users can only see a narrow area at a time, making navigation, scanning layouts, and locating off-screen UI elements extremely difficult. Caused by glaucoma, retinitis pigmentosa, or stroke.",
      stats: "Glaucoma alone affects over 80 million people worldwide (WHO) and is the leading cause of irreversible blindness. Retinitis pigmentosa affects approximately 1 in 4,000 individuals globally.",
      remedy: "Place error messages, alerts, and key actions close to the triggering element — never in a distant corner. Avoid relying on sidebar or header UI for critical feedback. Use inline validation and contextual popups near user focus points.",
      link: "https://www.w3.org/WAI/people-use-web/abilities/#vision"
    },
    achromatopsia: {
      title: "Total Achromatopsia (Complete Monochromacy)",
      description: "A rare congenital condition where all cone cells are absent or non-functional. The person perceives the world entirely in shades of grey, with no ability to distinguish any color frequency. It is often accompanied by severe light sensitivity (photophobia) and reduced visual acuity.",
      stats: "Total achromatopsia affects approximately 1 in 30,000 people worldwide. Partial forms (affecting some cone types) are more common. For those affected, any color-only UI convention is completely invisible.",
      remedy: "Design so all information is conveyed through luminance, shape, hierarchy, and labels alone — never color. Test your entire UI in full greyscale mode. Icons and visual weight must carry all meaning color would otherwise provide.",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"
    }
  }

  // Relative Luminance Calculation Pipeline
  const getRelativeLuminance = (hex) => {
    const cleanHex = hex.replace('#', '')
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255
    const transform = (val) => val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b)
  }

  const calculateContrastRatio = (color1, color2) => {
    const lum1 = getRelativeLuminance(color1)
    const lum2 = getRelativeLuminance(color2)
    return ((Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05)).toFixed(2)
  }

  const contrastRatio = calculateContrastRatio(textColor, bgColor)

  const openModal = (type, e) => {
    triggerRef.current = e.currentTarget
    setModalData(infoProfiles[type])
  }

  const closeModal = () => {
    setModalData(null)
    if (triggerRef.current) triggerRef.current.focus()
  }

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') closeModal() }
    if (modalData) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalData])

  return (
    <>
      {/* MOBILE BACKDROP LAYER */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* COMPONENT BODY CONTAINER */}
      <aside 
        id="control-sidebar"
        aria-label="Application Control Panel"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-900 p-5 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Workspace Branding Header */}
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-sm font-black uppercase tracking-widest text-yellow-500 italic">AccessiLab 2D</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
            {currentView === 'workspace' ? 'Workspace Mode' : 'Analytics Mode'}
          </p>
        </div>

        {/* Unified Tab Switcher */}
        <nav aria-label="Workspace Views" className="mt-4">
          <div role="tablist" className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800/80">
            <button type="button" role="tab" aria-selected={currentView === 'workspace'} onClick={() => setCurrentView('workspace')} className={`py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none cursor-pointer ${currentView === 'workspace' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Sandbox</button>
            <button type="button" role="tab" aria-selected={currentView === 'research'} onClick={() => setCurrentView('research')} className={`py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none cursor-pointer ${currentView === 'research' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Research</button>
          </div>
        </nav>

        {/* SCROLLING MAIN INTERFACE FRAME */}
        <div className="mt-6 flex-1 overflow-y-auto pr-1 select-none scrollbar-none">
          
          {currentView === 'workspace' ? (
            /* CONDITIONAL TRACK A: VISUAL SIMULATOR CONTROLS */
            <div className="space-y-5">
              <form onSubmit={onUrlSubmit} className="space-y-1.5">
                <label htmlFor="url-sandbox-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Test Live Site</label>
                <div className="flex gap-2">
                  <input id="url-sandbox-input" type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="e.g., example.com" />
                  <button type="submit" className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium hover:bg-blue-500 transition-colors cursor-pointer">Go</button>
                </div>
              </form>

              <section aria-label="Impairment Simulators" className="space-y-2">
                <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Impairment Modifiers</h2>
                
                {/* Far-Sightedness Toggle */}
                <div className="p-2.5 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-slate-200">Far-Sightedness</p>
                    <button type="button" onClick={(e) => openModal('blur', e)} className="text-slate-500 hover:text-blue-400 text-xs px-0.5 cursor-pointer">ⓘ</button>
                  </div>
                  <button type="button" role="switch" aria-checked={isBlurActive} onClick={() => setIsBlurActive(!isBlurActive)} className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full transition-colors ${isBlurActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isBlurActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* Protanopia Toggle */}
                <div className="p-2.5 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-slate-200">Protanopia</p>
                    <button type="button" onClick={(e) => openModal('protanopia', e)} className="text-slate-500 hover:text-blue-400 text-xs px-0.5 cursor-pointer">ⓘ</button>
                  </div>
                  <button type="button" role="switch" aria-checked={isProtanopiaActive} onClick={() => setIsProtanopiaActive(!isProtanopiaActive)} className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full transition-colors ${isProtanopiaActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isProtanopiaActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* Tritanopia Toggle */}
                <div className="p-2.5 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-slate-200">Tritanopia</p>
                    <button type="button" onClick={(e) => openModal('tritanopia', e)} className="text-slate-500 hover:text-blue-400 text-xs px-0.5 cursor-pointer">ⓘ</button>
                  </div>
                  <button type="button" role="switch" aria-checked={isTritanopiaActive} onClick={() => setIsTritanopiaActive(!isTritanopiaActive)} className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full transition-colors ${isTritanopiaActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isTritanopiaActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* Contrast Loss Toggle */}
                <div className="p-2.5 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-slate-200">Contrast Loss</p>
                    <button type="button" onClick={(e) => openModal('contrast', e)} className="text-slate-500 hover:text-blue-400 text-xs px-0.5 cursor-pointer">ⓘ</button>
                  </div>
                  <button type="button" role="switch" aria-checked={isLowContrastActive} onClick={() => setIsLowContrastActive(!isLowContrastActive)} className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full transition-colors ${isLowContrastActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isLowContrastActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* Tunnel Vision Toggle */}
                <div className="p-2.5 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-slate-200">Tunnel Vision</p>
                    <button type="button" onClick={(e) => openModal('tunnel', e)} className="text-slate-500 hover:text-blue-400 text-xs px-0.5 cursor-pointer">ⓘ</button>
                  </div>
                  <button type="button" role="switch" aria-checked={isTunnelVisionActive} onClick={() => setIsTunnelVisionActive(!isTunnelVisionActive)} className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full transition-colors ${isTunnelVisionActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isTunnelVisionActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>

                {/* Monochromacy Toggle */}
                <div className="p-2.5 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-slate-200">Monochromacy</p>
                    <button type="button" onClick={(e) => openModal('achromatopsia', e)} className="text-slate-500 hover:text-blue-400 text-xs px-0.5 cursor-pointer">ⓘ</button>
                  </div>
                  <button type="button" role="switch" aria-checked={isAchromatopsiaActive} onClick={() => setIsAchromatopsiaActive(!isAchromatopsiaActive)} className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full transition-colors ${isAchromatopsiaActive ? 'bg-yellow-500' : 'bg-slate-700'}`}><span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${isAchromatopsiaActive ? 'translate-x-4' : 'translate-x-0'} mt-0.5 ml-0.5`} /></button>
                </div>
              </section>

{/* Integrated Color Contrast Calculator Utility */}
              <section aria-label="Contrast Ratio Matrix Calculator" className="pt-2 border-t border-slate-800/80 space-y-2">
                <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Luminance Calculator</h2>
                <div className="p-3 bg-slate-950 border border-slate-800/60 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-400 block uppercase">Text (FG)</span>
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/60 rounded-md px-1.5 py-1">
                        <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-4 h-4 bg-transparent border-none rounded cursor-pointer" />
                        <span className="text-[10px] font-mono text-white uppercase">{textColor}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-400 block uppercase">Back (BG)</span>
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/60 rounded-md px-1.5 py-1">
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-4 h-4 bg-transparent border-none rounded cursor-pointer" />
                        <span className="text-[10px] font-mono text-white uppercase">{bgColor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2 bg-slate-900 rounded-lg flex items-center justify-between border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Ratio</span>
                    <span className={`text-sm font-black font-mono ${contrastRatio >= 4.5 ? 'text-emerald-400' : 'text-rose-400'}`}>{contrastRatio} : 1</span>
                  </div>

                  {/* EMBEDDED INFRASTRUCTURE USER GUIDE PANEL */}
                  <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-400 space-y-1.5 leading-normal">
                    <p>
                      <strong>What it measures:</strong> Relative luminance determines how bright a color feels to human photoreceptors. 
                    </p>
                    <p>
                      Because our eyes are biologically more sensitive to green wavelengths, the math weights channels explicitly: 
                      <code className="text-amber-500 font-mono text-[9px] block bg-slate-900 p-1 rounded mt-1 border border-slate-800">Y = 0.2126R + 0.7152G + 0.0722B</code>
                    </p>
                    <p className="text-[9px] text-slate-500 italic">
                      💡 Aim for a minimum baseline target of 4.5:1 for standard text layout compliance.
                    </p>
                  </div>

                </div>
              </section>
            </div>
          ) : (
            /* CONDITIONAL TRACK B: CLEAN RESEARCH METRICS OVERVIEW INDEX INDEX */
            <div className="space-y-4 pt-2" role="status">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Research Index</h2>
              
              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-3 text-xs leading-relaxed">
                <p className="text-slate-300">
                  You are exploring the <strong className="text-yellow-500 font-medium">Empirical Compliance Metrics</strong> grid.
                </p>
                <p className="text-slate-400 text-[11px]">
                  The interactive simulation modifiers are hidden in this view because you are looking at compliance documentation rather than an active website sandbox viewport iframe.
                </p>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono">
                  💡 Toggle back to <strong className="text-white font-medium">Sandbox</strong> above to audit a live website layout.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono">system.status: tracking</div>
      </aside>

      {/* POPUP MODAL ENGINES */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" role="dialog" aria-modal="true">
          <div ref={modalRef} tabIndex="-1" className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 focus:outline-none max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-sm font-bold text-white leading-snug">{modalData.title}</h3>
              <button type="button" onClick={closeModal} className="text-slate-400 hover:text-white text-xs font-mono shrink-0">✕</button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-400">What it is</span>
                <p className="text-xs text-slate-300 leading-relaxed">{modalData.description}</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-400">Who it affects</span>
                <p className="text-xs text-slate-300 leading-relaxed">{modalData.stats}</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400">How to design around it</span>
                <p className="text-xs text-slate-300 leading-relaxed">{modalData.remedy}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <a href={modalData.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-blue-400 hover:text-blue-300 underline transition-colors">Source ↗</a>
              <button type="button" onClick={closeModal} className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700 transition-colors">Dismiss</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}