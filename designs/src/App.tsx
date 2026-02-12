import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { Agentation } from 'agentation'
import './App.css'

interface Mockup {
  id: string
  title: string
  description: string
  file: string
  category: 'current' | 'concept' | 'iteration2'
}

const mockups: Mockup[] = [
  // Current UI
  { id: 'overview', title: 'Overview', description: 'Theme preview, Customize actions', file: 'overview.html', category: 'current' },
  { id: 'settings', title: 'Settings', description: 'Site details, paths, versions', file: 'settings.html', category: 'current' },
  { id: 'assistant', title: 'Assistant', description: 'Chat interface with messages', file: 'assistant.html', category: 'current' },
  { id: 'sync', title: 'Sync', description: 'GitHub sync placeholder', file: 'sync.html', category: 'current' },
  { id: 'previews', title: 'Previews', description: 'Share preview links', file: 'previews.html', category: 'current' },
  { id: 'import-export', title: 'Import / Export', description: 'Import/export placeholder', file: 'import-export.html', category: 'current' },
  // Iteration 2
  { id: 'concept-a-v2', title: 'A: Chat-First v2', description: 'Rich chat: image uploads, draft posts, editor panel, color/font picker', file: 'concept-a-v2.html', category: 'iteration2' },
  { id: 'concept-b-v2', title: 'B: Persistent Chat v2', description: 'Polished chat sidebar with tabs, multiple conversations', file: 'concept-b-v2.html', category: 'iteration2' },
  { id: 'concept-c-v2', title: 'C: AI Dashboard v2', description: 'Smart dashboard with stats, traffic, AI suggestions', file: 'concept-c-v2.html', category: 'iteration2' },
  // Concepts
  { id: 'concept-a', title: 'A: Chat-First', description: 'Conversation IS the interface, no tabs', file: 'concept-a-chat-first.html', category: 'concept' },
  { id: 'concept-b', title: 'B: Persistent Chat', description: 'Traditional UI + always-on chat sidebar', file: 'concept-b-persistent-chat.html', category: 'concept' },
  { id: 'concept-c', title: 'C: AI Dashboard', description: 'Goal-oriented suggestion cards, no chat', file: 'concept-c-ai-dashboard.html', category: 'concept' },
  { id: 'concept-d', title: 'D: Vibe Workbench', description: 'WP as app platform, build anything', file: 'concept-d-vibe-workbench.html', category: 'concept' },
  { id: 'concept-e', title: 'E: Project Folders', description: 'Sidebar with folder organization', file: 'concept-e-project-folders.html', category: 'concept' },
]

function MockupViewer() {
  const { mockupId } = useParams<{ mockupId: string }>()
  const navigate = useNavigate()
  const [html, setHtml] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const mockup = mockups.find(m => m.id === mockupId)

  useEffect(() => {
    if (!mockup) {
      navigate('/')
      return
    }

    async function loadMockup() {
      setLoading(true)
      try {
        const response = await fetch(`/mockups/${mockup!.file}`)
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
        
        // Extract scripts
        const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi)
        let scripts = ''
        if (scriptMatch) {
          scripts = scriptMatch.map(s => {
            const match = s.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
            return match ? match[1] : ''
          }).join('\n')
        }
        
        setHtml(`<style>${styles}</style>${bodyContent}`)
        
        // Execute extracted scripts after render
        if (scripts) {
          setTimeout(() => {
            try { new Function(scripts)() } catch (e) { console.error('Mockup script error:', e) }
          }, 0)
        }
      } catch (err) {
        console.error('Failed to load mockup:', err)
        setHtml('<p>Failed to load mockup</p>')
      }
      setLoading(false)
    }
    loadMockup()
  }, [mockup, navigate])

  if (!mockup) {
    return null
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <>
      <div 
        className="mockup-fullscreen"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Agentation endpoint="http://localhost:4747" />
    </>
  )
}

function Gallery() {
  const currentMockups = mockups.filter(m => m.category === 'current')
  const conceptMockups = mockups.filter(m => m.category === 'concept')
  const iteration2Mockups = mockups.filter(m => m.category === 'iteration2')

  return (
    <div className="gallery">
      <header className="gallery-header">
        <h1>Studio Vibe Coding</h1>
        <p>Design mockups and explorations</p>
      </header>

      <section className="mockup-section">
        <h2>Iteration 2 — Refined Concepts</h2>
        <div className="mockup-grid">
          {iteration2Mockups.map(mockup => (
            <Link
              key={mockup.id}
              className="mockup-card"
              to={`/${mockup.id}`}
            >
              <div className="mockup-preview">
                <iframe src={`/mockups/${mockup.file}`} tabIndex={-1} />
              </div>
              <div className="mockup-info">
                <h3>{mockup.title}</h3>
                <p>{mockup.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mockup-section">
        <h2>New Concepts</h2>
        <div className="mockup-grid">
          {conceptMockups.map(mockup => (
            <Link
              key={mockup.id}
              className="mockup-card"
              to={`/${mockup.id}`}
            >
              <div className="mockup-preview">
                <iframe src={`/mockups/${mockup.file}`} tabIndex={-1} />
              </div>
              <div className="mockup-info">
                <h3>{mockup.title}</h3>
                <p>{mockup.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mockup-section">
        <h2>Current UI — Recreation</h2>
        <div className="mockup-grid">
          {currentMockups.map(mockup => (
            <Link
              key={mockup.id}
              className="mockup-card"
              to={`/${mockup.id}`}
            >
              <div className="mockup-preview">
                <iframe src={`/mockups/${mockup.file}`} tabIndex={-1} />
              </div>
              <div className="mockup-info">
                <h3>{mockup.title}</h3>
                <p>{mockup.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function AppContent() {
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

  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/:mockupId" element={<MockupViewer />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
