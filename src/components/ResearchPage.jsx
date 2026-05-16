export default function ResearchPage() {
  return (
    <div className="w-full h-full overflow-y-auto bg-slate-950 p-8 text-slate-100 select-none animate-fadeIn">
      
      {/* Top Meta Headers */}
      <div className="space-y-2 mb-8 border-b border-slate-900 pb-6">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest font-bold text-amber-500 uppercase">
          <span>Database Version 2026.1</span>
          <span>•</span>
          <span>Verified Sources</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white uppercase">
          Empirical Compliance Metrics
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Universal design is grounded in rigorous mathematical and medical observations. Review the core statistical baselines compiled by global research organizations to guide your UI design engineering choices.
        </p>
      </div>

      {/* SECTION 1: VISUAL SPECTRUM LIMITATIONS DETAILED CARDS */}
      <section className="space-y-4 mb-10">
        <h2 className="text-[11px] font-bold font-mono tracking-widest text-slate-400 uppercase">
          Visual Spectrum Limitations & Metrics
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: 1.3 Billion Impacted */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-black font-mono text-amber-500 tracking-tight">1.3 Billion</span>
                <a 
                  href="https://www.who.int/news-room/fact-sheets/detail/disability-and-health" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[9px] font-mono text-blue-400 hover:text-blue-300 transition-colors underline cursor-pointer"
                >
                  WHO Disability ↗
                </a>
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wide">Global Population Impacted</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                About 16% of the global population experiences significant disability. Inaccessible digital environments inherently lock out this enormous consumer block from basic daily web tools.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="text-[10px] font-bold font-mono text-blue-400 block uppercase mb-1">Architecture Impact</span>
              Establishes an undeniable legal and functional baseline requiring global programmatic layout accessibility.
            </div>
          </div>

          {/* Card 2: 95.9% Automated Failures */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-black font-mono text-amber-500 tracking-tight">95.9%</span>
                <a 
                  href="https://webaim.org/projects/million/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[9px] font-mono text-blue-400 hover:text-blue-300 transition-colors underline cursor-pointer"
                >
                  WebAIM Million ↗
                </a>
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wide">The WCAG Failure Baseline</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                An exhaustive automated sweep across the top 1,000,000 homepages discovered that 95.9% had distinct, detectable WCAG 2 failures—overwhelmingly caused by low-contrast typography choices.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="text-[10px] font-bold font-mono text-blue-400 block uppercase mb-1">Engineering Remedy</span>
              Integrating automated contrast checking engines directly into frontend component tests entirely breaks this failure rate down.
            </div>
          </div>

          {/* Card 3: 2.2 Billion Vision Impairments */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-black font-mono text-amber-500 tracking-tight">2.2 Billion</span>
                <a 
                  href="https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[9px] font-mono text-blue-400 hover:text-blue-300 transition-colors underline cursor-pointer"
                >
                  WHO Vision ↗
                </a>
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wide">Visual Impairments Matrix</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Over 2.2 billion individuals globally manage near or distance vision complications. Unaddressed presbyopia (far-sightedness / focal blur) forms a massive baseline segment, encompassing over 826 million people.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="text-[10px] font-bold font-mono text-blue-400 block uppercase mb-1">Fluid Fix</span>
              Enforce fluid, scalable layout grids using relative responsive units (<code className="text-amber-400 font-mono text-[10px]">rem/em</code>) instead of static pixels.
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: RESTORED ATYPICAL COLOR PERCEPTION PROFILES ROW */}
      <section className="space-y-4 mb-10">
        <h2 className="text-[11px] font-bold font-mono tracking-widest text-slate-400 uppercase">
          Atypical Color Perception Profiles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1 in 12 Men (Protan/Deuteran) */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-black font-mono text-amber-500 tracking-tight">1 in 12 Men</span>
                <a 
                  href="https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[9px] font-mono text-blue-400 hover:text-blue-300 transition-colors underline cursor-pointer"
                >
                  NIH Eye Institute ↗
                </a>
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wide">Congenital Color Vision Deficiencies</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Congenital color vision deficiencies affect roughly 8% of male populations and 0.5% of female populations globally. This primarily encompasses Protanopia (red-blindness) and Deuteranopia (green-blindness).
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="text-[10px] font-bold font-mono text-blue-400 block uppercase mb-1">Design System Standard</span>
              Never rely solely on color shifts (e.g., green indicators vs red alerts) to convey structural system state information. Supplement states with icons or clear labels.
            </div>
          </div>

          {/* 1 in 30,000 (Achromatopsia) */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-black font-mono text-amber-500 tracking-tight">1 in 30,000</span>
                <a 
                  href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[9px] font-mono text-blue-400 hover:text-blue-300 transition-colors underline cursor-pointer"
                >
                  W3C Color Analytics ↗
                </a>
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wide">Total Achromatopsia Prevalence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Achromatopsia completely limits the eye's cone cell system network, leaving individuals to process interface elements exclusively through luminance variations. Standard color-blind fallback states fail to address this condition natively.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="text-[10px] font-bold font-mono text-blue-400 block uppercase mb-1">Verification Strategy</span>
              Audit your compositions completely in pure grayscale mode to ensure user user flows remain recognizable through contrast weighting and shape hierarchies alone.
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: THE STRUCTURAL P.O.U.R. FRAMEWORK ROW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2">
          <h2 className="text-[11px] font-bold font-mono tracking-widest text-slate-400 uppercase">
            The P.O.U.R. Structural Framework
          </h2>
          <a 
            href="https://www.w3.org/TR/WCAG22/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md transition-colors cursor-pointer underline"
          >
            Official Spec Schema ↗
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Perceivable */}
          <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-2">
            <div className="text-xs font-mono font-black text-blue-400">01. Perceivable</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Information and UI components cannot be invisible to all of a user's senses. Digital assets must be translatable into forms they can notice (e.g., clear alt text, flexible color-contrast channels).
            </p>
          </div>

          {/* Operable */}
          <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-2">
            <div className="text-xs font-mono font-black text-blue-400">02. Operable</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The interactive interface cannot require movements or mechanical inputs that a human cannot physically execute. Navigation must support multiple input structures, including robust keyboard-only controls.
            </p>
          </div>

          {/* Understandable */}
          <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-2">
            <div className="text-xs font-mono font-black text-blue-400">03. Understandable</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Content operations cannot expand beyond user comprehension. Both the user interface and operation processes must behave predictably, featuring informative error prevention matrices.
            </p>
          </div>

          {/* Robust */}
          <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-2">
            <div className="text-xs font-mono font-black text-blue-400">04. Robust</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Code architecture must be sound enough to stay stable across a broad spectrum of evolving digital user environments, including specialized assistive screen readers and hardware platforms.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}