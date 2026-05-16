export default function ResearchPage() {
  const categories = [
    {
      group: "Visual Spectrum Limitations",
      items: [
        {
          metric: "2.2 Billion",
          title: "Global Near & Distance Impairments",
          context: "Per the World Health Organization, over 2.2 billion individuals manage near or distance vision complications. A massive baseline segment involves unaddressed presbyopia, creating persistent focal blur for users attempting to parse small mobile typography scales.",
          remedy: "Enforce a fluid, type-scalable layout architecture using relative CSS units (rem/em) so elements expand dynamically with browser preferences.",
          source: "WHO Vision Database",
          link: "https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment"
        },
        {
          metric: "95.9%",
          title: "The Automated Failure Baseline",
          context: "An exhaustive automated software analysis tracking the top 1,000,000 global website homepages revealed that an overwhelming 95.9% displayed clear-cut, distinct WCAG 2 conformance violations.",
          remedy: "The primary culprit is low contrast text layouts. Integrating rigorous contrast audits directly into pre-production workflows entirely eliminates this baseline failure rate.",
          source: "The WebAIM Million Annual Evaluation",
          link: "https://webaim.org/projects/million/"
        }
      ]
    },
    {
      group: "Atypical Color Perception Profiles",
      items: [
        {
          metric: "1 in 12 Men",
          title: "Congenital Color Vision Deficiencies",
          context: "Congenital color vision deficiencies affect roughly 8% of male populations and 0.5% of female populations globally. This encompasses Protanopia (red-blindness), Deuteranopia (green-blindness), and the rarer Tritanopia (blue-yellow confusion).",
          remedy: "Never utilize color indicators as the exclusive mechanism to communicate dynamic system states, data variations, alerts, or form interface validation errors.",
          source: "NIH Eye Institute Research",
          link: "https://www.nih.gov/"
        },
        {
          metric: "1 in 30,000",
          title: "Total Achromatopsia Prevalence",
          context: "Achromatopsia completely limits the eye's retinal cone system, leaving individuals to process visual details exclusively through luminance patterns. Standard color-blind fallback states fail to address this condition completely.",
          remedy: "Layout interfaces must retain a logical, legible reading hierarchy when completely stripped of chromatic values, relying purely on shape, contrast values, and text descriptors.",
          source: "W3C Use of Color Analytics",
          link: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"
        }
      ]
    },
    {
      group: "Structural & Spatial Constraints",
      items: [
        {
          metric: "< 20 Degrees",
          title: "Peripheral Vision Occlusion (Tunnel Vision)",
          context: "Advanced progression of Glaucoma or Retinitis Pigmentosa constrains a user's functional field of view to a tight central aperture under 20 degrees, rendering the surrounding viewport space invisible during active fixations.",
          remedy: "Group dynamic state updates, confirmation banners, and context changes immediately adjacent to the triggering control node, rather than throwing notifications to distant screen margins.",
          source: "W3C Field of Vision Classifications",
          link: "https://www.w3.org/WAI/people-use-web/abilities/#vision"
        }
      ]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 lg:p-10 text-slate-200">
      
      {/* Viewport Header */}
      <header className="max-w-5xl mx-auto mb-12 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-yellow-500 uppercase tracking-widest">
          <span>Database Version 2026.1</span>
          <span className="h-1 w-1 rounded-full bg-slate-700" />
          <span>Verified Sources</span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight uppercase sm:text-3xl">
          Empirical Compliance Metrics
        </h2>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          Universal design is grounded in rigorous mathematical and medical observations. Review the core statistical baselines compiled by global research organizations to guide your UI design engineering choices.
        </p>
      </header>

      {/* Main Structural Layout Group */}
      <main className="max-w-5xl mx-auto space-y-12">
        {categories.map((category, index) => (
          <section 
            key={index} 
            aria-labelledby={`group-heading-${index}`}
            className="space-y-6"
          >
            <h3 
              id={`group-heading-${index}`}
              className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-900 pb-2"
            >
              {category.group}
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {category.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700/60 transition-colors"
                >
                  <div className="space-y-4">
                    {/* Value Badge & Core Identification */}
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-black text-yellow-500 font-mono tracking-tight">
                        {item.metric}
                      </span>
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-slate-500 hover:text-blue-400 underline transition-colors"
                        aria-label={`View primary data source for ${item.title}`}
                      >
                        {item.source} ↗
                      </a>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {item.context}
                      </p>
                    </div>
                  </div>

                  {/* Core Remedy Block */}
                  <div className="mt-5 pt-4 border-t border-slate-950 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-blue-400 block">
                      Engineering Remedy
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {item.remedy}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Ground Truth Global Callout Block */}
      <footer className="max-w-5xl mx-auto mt-16 p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl text-center space-y-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          The 1.3 Billion Global Demographic Base
        </h3>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          Approximately 1 in 6 people globally navigate a significant disability. Building inclusive products isn't a post-production polishing step—it's a foundational requirement of structural web architecture.
        </p>
      </footer>

    </div>
  );
}