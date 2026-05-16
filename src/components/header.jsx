export default function Header({ setIsSidebarOpen, currentUrl, currentView }) {
  return (
    <header className="flex h-14 items-center border-b border-slate-800 bg-slate-900/50 px-4 lg:px-6 shrink-0 justify-between lg:justify-end">
      <button 
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 lg:hidden"
      >
        ☰ Controls
      </button>
      
      <div className="text-[11px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1 border border-slate-800 rounded-md max-w-xs truncate">
        {currentView === 'workspace' ? `Viewing Frame: ${currentUrl}` : 'Document Mode: WCAG Research'}
      </div>
    </header>
  )
}