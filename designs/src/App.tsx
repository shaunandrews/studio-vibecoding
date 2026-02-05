import { useState } from 'react'
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

function App() {
  const [selectedMockup, setSelectedMockup] = useState<Mockup | null>(null)

  const currentMockups = mockups.filter(m => m.category === 'current')
  const conceptMockups = mockups.filter(m => m.category === 'concept')

  if (selectedMockup) {
    return (
      <div className="viewer">
        <header className="viewer-header">
          <button onClick={() => setSelectedMockup(null)} className="back-button">
            ← Back to Gallery
          </button>
          <h1>{selectedMockup.title}</h1>
          <span className="hint">Click ⓘ button to annotate elements</span>
        </header>
        <iframe 
          src={`/mockups/${selectedMockup.file}`}
          className="mockup-frame"
          title={selectedMockup.title}
        />
        <Agentation endpoint="http://localhost:4747" />
      </div>
    )
  }

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
              onClick={() => setSelectedMockup(mockup)}
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
              onClick={() => setSelectedMockup(mockup)}
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

export default App
