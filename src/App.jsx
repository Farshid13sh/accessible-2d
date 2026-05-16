import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Viewport from './components/Viewport'
import ResearchPage from './components/ResearchPage'

export default function App() {
  const [currentView, setCurrentView] = useState('workspace') // 'workspace' | 'research'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Comprehensive Impairment States
  const [isBlurActive, setIsBlurActive] = useState(false)
  const [isProtanopiaActive, setIsProtanopiaActive] = useState(false)
  const [isTritanopiaActive, setIsTritanopiaActive] = useState(false)
  const [isLowContrastActive, setIsLowContrastActive] = useState(false)
  const [isTunnelVisionActive, setIsTunnelVisionActive] = useState(false)
  const [isAchromatopsiaActive, setIsAchromatopsiaActive] = useState(false)
  
  const [urlInput, setUrlInput] = useState('https://example.com')
  const [currentUrl, setCurrentUrl] = useState('https://example.com')

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    let formattedUrl = urlInput.trim()
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`
    }
    setCurrentUrl(formattedUrl)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      
      {/* GLOBAL SVG MATRIX REGISTRY */}
      <svg className="absolute w-0 h-0 invisible" aria-hidden="true" focusable="false">
        <defs>
          {/* Protanopia */}
          <filter id="protanopia">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0,     0, 0
                      0.558, 0.442, 0,     0, 0
                      0,     0.242, 0.758, 0, 0
                      0,     0,     0,     1, 0"
            />
          </filter>
          {/* Tritanopia */}
          <filter id="tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95,  0.05,  0,     0, 0
                      0,     0.433, 0.567, 0, 0
                      0,     0.475, 0.525, 0, 0
                      0,     0,     0,     1, 0"
            />
          </filter>
          {/* Total Achromatopsia (Standard Luminance Weightings) */}
          <filter id="achromatopsia">
            <feColorMatrix
              type="matrix"
              values="0.299, 0.587, 0.114, 0, 0
                      0.299, 0.587, 0.114, 0, 0
                      0.299, 0.587, 0.114, 0, 0
                      0,     0,     0,     1, 0"
            />
          </filter>
        </defs>
      </svg>

      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
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
        urlInput={urlInput}
        setUrlInput={setUrlInput}
        onUrlSubmit={handleUrlSubmit}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className="flex flex-1 flex-col overflow-hidden bg-slate-950">
        <Header 
          setIsSidebarOpen={setIsSidebarOpen} 
          currentUrl={currentUrl} 
          currentView={currentView} 
        />

        {currentView === 'workspace' ? (
          <Viewport 
            currentUrl={currentUrl} 
            isBlurActive={isBlurActive} 
            isProtanopiaActive={isProtanopiaActive} 
            isTritanopiaActive={isTritanopiaActive}
            isLowContrastActive={isLowContrastActive}
            isTunnelVisionActive={isTunnelVisionActive}
            isAchromatopsiaActive={isAchromatopsiaActive}
          />
        ) : (
          <ResearchPage />
        )}
      </div>
    </div>
  )
}