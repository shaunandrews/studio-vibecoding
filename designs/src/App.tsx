import { useState, useEffect } from 'react'
import { Agentation } from 'agentation'
import './App.css'

interface Mockup {
  id: string
  title: string
  description: string
  file: string
  category: 'current' | 'concept'
}

const mockups: Mockup[] = [
  // Current UI
  { id: 'overview', title: 'Overview', description: 'Theme preview, Customize actions', file: 'overview.html', category: 'current' },
  { id: 'settings', title: 'Settings', description: 'Site details, paths, versions', file: 'settings.html', category: 'current' },
  { id: 'assistant', title: 'Assistant', description: 'Chat interface with messages', file: 'assistant.html', category: 'current' },
  { id: 'sync', title: 'Sync', description: 'GitHub sync placeholder', file: 'sync.html', category: 'current' },
  { id: 'previews', title: 'Previews', description: 'Share preview links', file: 'previews.html', category: 'current' },
  { id: 'import-export', title: 'Import / Export', description: 'Import/export placeholder', file: 'import-export.html', category: 'current' },
  // Concepts
  { id: 'concept-a', title: 'A: Chat-First', description: 'Conversation IS the interface, no tabs', file: 'concept-a-chat-first.html', category: 'concept' },
  { id: 'concept-b', title: 'B: Persistent Chat', description: 'Traditional UI + always-on chat sidebar', file: 'concept-b-persistent-chat.html', category: 'concept' },
  { id: 'concept-c', title: 'C: AI Dashboard', description: 'Goal-oriented suggestion cards, no chat', file: 'concept-c-ai-dashboard.html', category: 'concept' },
  { id: 'concept-d', title: 'D: Vibe Workbench', description: 'WP as app platform, build anything', file: 'concept-d-vibe-workbench.html', category: 'concept' },
]

function MockupViewer({ mockup }: { mockup: Mockup }) {
  const [html, setHtml] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMockup() {
      setLoading(true)
      try {
        const response = await fetch(`/mockups/${mockup.file}`)
        let content = await response.text()
        
        // Extract just the body content and styles
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i)
        const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi)
        
        let styles = ''
        if (styleMatch) {
          styles = styleMatch.map(s => {
            const match = s.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
            return match ? match[1] : ''
          }).join('\n')
        }
        
        const bodyContent = bodyMatch ? bodyMatch[1] : content
        setHtml(`<style>${styles}</style>${bodyContent}`)
      } catch (err) {
        console.error('Failed to load mockup:', err)
        setHtml('<p>Failed to load mockup</p>')
      }
      setLoading(false)
    }
    loadMockup()
  }, [mockup.file])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div 
      className="mockup-fullscreen"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function Gallery({ onSelect }: { onSelect: (mockup: Mockup) => void }) {
  const currentMockups = mockups.filter(m => m.category === 'current')
  const conceptMockups = mockups.filter(m => m.category === 'concept')

  return (
    <div className="gallery">
      <header className="gallery-header">
        <h1>Studio Vibe Coding</h1>
        <p>Design mockups and explorations</p>
      </header>

      <section className="mockup-section">
        <h2>New Concepts</h2>
        <div className="mockup-grid">
          {conceptMockups.map(mockup => (
            <button
              key={mockup.id}
              className="mockup-card"
              onClick={() => onSelect(mockup)}
            >
              <div className="mockup-preview">
                <iframe src={`/mockups/${mockup.file}`} tabIndex={-1} />
              </div>
              <div className="mockup-info">
                <h3>{mockup.title}</h3>
                <p>{mockup.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mockup-section">
        <h2>Current UI — Recreation</h2>
        <div className="mockup-grid">
          {currentMockups.map(mockup => (
            <button
              key={mockup.id}
              className="mockup-card"
              onClick={() => onSelect(mockup)}
            >
              <div className="mockup-preview">
                <iframe src={`/mockups/${mockup.file}`} tabIndex={-1} />
              </div>
              <div className="mockup-info">
                <h3>{mockup.title}</h3>
                <p>{mockup.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function App() {
  const [selectedMockup, setSelectedMockup] = useState<Mockup | null>(null)

  // Handle URL hash for navigation
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.slice(1) // Remove #
      if (hash) {
        const mockup = mockups.find(m => m.id === hash)
        setSelectedMockup(mockup || null)
      } else {
        setSelectedMockup(null)
      }
    }

    // Check initial hash
    handleHashChange()

    // Listen for changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Load mockup CSS files
  useEffect(() => {
    const links = ['/mockups/tokens.css', '/mockups/base.css']
    links.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        document.head.appendChild(link)
      }
    })
  }, [])

  function handleSelect(mockup: Mockup) {
    window.location.hash = mockup.id
  }

  if (selectedMockup) {
    return (
      <>
        <MockupViewer mockup={selectedMockup} />
        <Agentation endpoint="http://localhost:4747" />
      </>
    )
  }

  return <Gallery onSelect={handleSelect} />
}

export default App
