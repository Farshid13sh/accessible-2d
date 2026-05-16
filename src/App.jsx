import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Viewport from './components/Viewport'
import ResearchPage from './components/ResearchPage'

export default function App() {
  // Navigation layout control: 'workspace' or 'research'
  const [currentView, setCurrentView] = useState('workspace')
  
  // Test website URL state pipes
  const [urlInput, setUrlInput] = useState('https://example.com')
  const [currentUrl, setCurrentUrl] = useState('https://example.com')

  // Impairment Shaders & Filter states
  const [isBlurActive, setIsBlurActive] = useState(false)
  const [isProtanopiaActive, setIsProtanopiaActive] = useState(false)
  const [isTritanopiaActive, setIsTritanopiaActive] = useState(false)
  const [isLowContrastActive, setIsLowContrastActive] = useState(false)
  const [isTunnelVisionActive, setIsTunnelVisionActive] = useState(false)
  const [isAchromatopsiaActive, setIsAchromatopsiaActive] = useState(false)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    let cleanUrl = urlInput.trim()
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`
    }
    setCurrentUrl(cleanUrl)
  }

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden font-sans text-slate-200">
      
      {/* SIDEBAR STATION */}
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
        onUrlSubmit={handleUrlSubmit}
        isBlurActive={isBlurActive}
        setIsBlurActive={setIsBlurActive}
        isProtanopiaActive={isProtanopiaActive}
        setIsProtanopiaActive={setIsProtanopiaActive}
        isTritanopiaActive={isTritanopiaActive}
        setIsTritanopiaActive={setIsTritanopiaActive}
        isLowContrastActive={isLowContrastActive}
        setIsLowContrastActive={setIsLowContrastActive}
        isTunnelVisionActive={isTunnelVisionActive}
        setIsTunnelVisionActive={setIsTunnelVisionActive}
        isAchromatopsiaActive={isAchromatopsiaActive}
        setIsAchromatopsiaActive={setIsAchromatopsiaActive}
      />

      {/* DYNAMIC MAIN STAGE CONTAINER */}
      <div className="flex-1 flex h-full overflow-hidden relative">
        {currentView === 'workspace' ? (
          /* THE SANDBOX WORKSPACE: This must split your screen or render the frame layout */
          <div className="flex-1 flex gap-4 p-4 overflow-hidden">
            
            {/* LEFT CONTAINER: Your Live Testing Website Viewport Frame */}
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative shadow-inner">
              <Viewport 
                currentUrl={currentUrl}
                isBlurActive={isBlurActive}
                isProtanopiaActive={isProtanopiaActive}
                isTritanopiaActive={isTritanopiaActive}
                isLowContrastActive={isLowContrastActive}
                isTunnelVisionActive={isTunnelVisionActive}
                isAchromatopsiaActive={isAchromatopsiaActive}
              />
            </div>

          </div>
        ) : (
          /* THE DEDICATED FULL-SCREEN COMPLIANCE RESEARCH LAYOUT */
          <div className="flex-1 overflow-y-auto">
            <ResearchPage />
          </div>
        )}
      </div>

    </div>
  )
}