export default function ResearchPage() {
const statistics = [
    {
      value: "1.3 Billion",
      label: "Global Population Impacted",
      desc: "Approximately 16% of the world's population (1 in 6 people) live with a significant disability. Inaccessible digital architecture actively excludes this massive consumer demographic from the modern web.",
      source: "WHO Global Disability Analysis (Continuous Review)",
      link: "https://www.who.int/news-room/fact-sheets/detail/disability-and-health"
    },
    {
      value: "95.9%",
      label: "The WCAG Failure Baseline",
      desc: "An exhaustive automated software sweep across the top 1,000,000 global homepages discovered that 95.9% displayed distinct, clear-cut WCAG 2 conformance violations—overwhelmingly caused by low contrast text layouts.",
      source: "The WebAIM Million Annual Evaluation",
      link: "https://webaim.org/projects/million/"
    },
    {
      value: "2.2 Billion",
      label: "Visual Impairments",
      desc: "Over 2.2 billion individuals globally manage near or distance vision impairment. Unaddressed presbyopia (far-sightedness / focal blur) forms the single largest segment, encompassing over 826 million people.",
      source: "WHO Global Vision Database (Updated Metrics)",
      link: "https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment"
    }
  ];

  const pillars = [
    {
      title: "The P.O.U.R. Structural Framework",
      subtitle: "W3C International Engineering Standards",
      source: "W3C Web Accessibility Initiative (WAI)",
      link: "https://www.w3.org/WAI/fundamentals/accessibility-principles/",
      points: [
        { name: "Perceivable", text: "Information and UI interfaces cannot be invisible to all of a user's senses. Digital assets must be translatable into forms they can notice (e.g., text alternatives for audio/visual components)." },
        { name: "Operable", text: "The interactive interface cannot require movements or inputs that a human cannot physically execute. Navigation must support multiple input types, including keyboard-only controls." },
        { name: "Understandable", text: "Content and operations cannot expand beyond user comprehension. Interface systems must behave predictably and provide clear structural patterns." },
        { name: "Robust", text: "Code architecture must be sound enough to stay stable across a broad spectrum of evolving digital environments, including assistive screen readers and third-party interpreters." }
      ]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Intro Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-md">
            Empirical Validation Metrics
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Why Accessibility Matters
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Digital spaces frequently treat human accessibility as an optional feature layer. True accessibility (a11y) is a foundational software standard that adapts user interfaces to human sensory and physical realities.
          </p>
        </div>

        {/* Statistical Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {statistics.map((stat, idx) => (
            <div key={idx} className="flex flex-col justify-between p-6 bg-slate-900 border border-slate-800/80 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
              <div className="space-y-2">
                <p className="text-4xl font-black tracking-tight text-yellow-500 font-mono">
                  {stat.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  {stat.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800">
                <a 
                  href={stat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-blue-400 transition-colors group/link"
                >
                  Source: {stat.source}
                  <span className="inline-block transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* WCAG Pillars Structure */}
        {pillars.map((pillar, idx) => (
          <div key={idx} className="p-8 bg-slate-900/40 border border-slate-800/60 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{pillar.subtitle}</p>
              </div>
              <a 
                href={pillar.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block self-start sm:self-center text-[10px] font-mono text-slate-500 hover:text-blue-400 border border-slate-800 rounded-md px-2.5 py-1 bg-slate-950/40 hover:bg-slate-950 transition-colors"
              >
                Official Spec Schema ↗
              </a>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {pillar.points.map((pt, pIdx) => (
                <div key={pIdx} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-blue-400 font-mono">
                    0{pIdx + 1}. {pt.name}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pt.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Curb-Cut Phenomenon Note */}
        <div className="p-6 border border-yellow-500/10 bg-yellow-500/[0.02] rounded-xl flex gap-4 items-start">
          <span className="text-lg">💡</span>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wide text-yellow-500">The Curb-Cut Effect</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When physical sidewalk cutouts were built for wheelchair users, it instantly streamlined navigation for parents with strollers, travelers hauling luggage, and structural delivery teams. Digitally optimizing for edge-case constraints creates clean code patterns that automatically improve indexability, SEO compliance, mobile responsiveness, and performance scalability across all computing platforms.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}