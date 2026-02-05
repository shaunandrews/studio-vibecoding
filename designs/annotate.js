/**
 * Simple Annotation Tool for HTML Mockups
 * Sends annotations to Agentation MCP server (localhost:4747)
 */
(function() {
  const ENDPOINT = 'http://localhost:4747';
  let sessionId = null;
  let isActive = false;
  let toolbar = null;
  let highlightOverlay = null;
  
  // Styles
  const styles = `
    #annotate-toolbar {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 13px;
    }
    #annotate-toggle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: #1e1e1e;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s, background 0.15s;
    }
    #annotate-toggle:hover {
      transform: scale(1.05);
      background: #3858e9;
    }
    #annotate-toggle.active {
      background: #3858e9;
    }
    #annotate-toggle svg {
      width: 24px;
      height: 24px;
    }
    #annotate-highlight {
      position: fixed;
      pointer-events: none;
      border: 2px solid #3858e9;
      background: rgba(56, 88, 233, 0.1);
      z-index: 999998;
      display: none;
    }
    #annotate-popup {
      position: fixed;
      z-index: 999999;
      background: white;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      padding: 12px;
      width: 280px;
      display: none;
    }
    #annotate-popup textarea {
      width: 100%;
      min-height: 60px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 8px;
      font-size: 13px;
      resize: vertical;
      margin-bottom: 8px;
    }
    #annotate-popup textarea:focus {
      outline: none;
      border-color: #3858e9;
    }
    #annotate-popup-path {
      font-size: 11px;
      color: #666;
      margin-bottom: 8px;
      word-break: break-all;
      font-family: monospace;
      background: #f5f5f5;
      padding: 4px 6px;
      border-radius: 4px;
    }
    #annotate-popup-buttons {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
    #annotate-popup-buttons button {
      padding: 6px 12px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    }
    #annotate-cancel {
      background: #f0f0f0;
      color: #333;
    }
    #annotate-submit {
      background: #3858e9;
      color: white;
    }
    #annotate-submit:hover {
      background: #2a46ce;
    }
    .annotate-mode * {
      cursor: crosshair !important;
    }
  `;

  // Get CSS selector for element
  function getSelector(el) {
    if (el.id) return '#' + el.id;
    if (el === document.body) return 'body';
    
    const parts = [];
    while (el && el !== document.body) {
      let selector = el.tagName.toLowerCase();
      if (el.className && typeof el.className === 'string') {
        const classes = el.className.trim().split(/\s+/).filter(c => !c.startsWith('annotate'));
        if (classes.length) selector += '.' + classes.slice(0, 2).join('.');
      }
      parts.unshift(selector);
      el = el.parentElement;
    }
    return parts.join(' > ');
  }

  // Create session
  async function createSession() {
    try {
      const res = await fetch(ENDPOINT + '/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: window.location.href,
          domain: window.location.host
        })
      });
      const data = await res.json();
      sessionId = data.id;
      console.log('[Annotate] Session created:', sessionId);
    } catch (err) {
      console.error('[Annotate] Failed to create session:', err);
    }
  }

  // Send annotation
  async function sendAnnotation(element, comment) {
    if (!sessionId) await createSession();
    
    const rect = element.getBoundingClientRect();
    const annotation = {
      comment,
      element: element.tagName.toLowerCase(),
      elementPath: getSelector(element),
      cssClasses: element.className || '',
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      boundingBox: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      },
      url: window.location.href,
      timestamp: Date.now()
    };

    try {
      await fetch(ENDPOINT + '/sessions/' + sessionId + '/annotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(annotation)
      });
      console.log('[Annotate] Sent:', annotation.elementPath);
    } catch (err) {
      console.error('[Annotate] Failed to send:', err);
    }
  }

  // Initialize
  function init() {
    // Add styles
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Create toolbar
    toolbar = document.createElement('div');
    toolbar.id = 'annotate-toolbar';
    toolbar.innerHTML = `
      <button id="annotate-toggle" title="Toggle annotation mode">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
      </button>
    `;
    document.body.appendChild(toolbar);

    // Create highlight overlay
    highlightOverlay = document.createElement('div');
    highlightOverlay.id = 'annotate-highlight';
    document.body.appendChild(highlightOverlay);

    // Create popup
    const popup = document.createElement('div');
    popup.id = 'annotate-popup';
    popup.innerHTML = `
      <div id="annotate-popup-path"></div>
      <textarea id="annotate-comment" placeholder="What's the issue?"></textarea>
      <div id="annotate-popup-buttons">
        <button id="annotate-cancel">Cancel</button>
        <button id="annotate-submit">Add</button>
      </div>
    `;
    document.body.appendChild(popup);

    // Toggle button
    document.getElementById('annotate-toggle').addEventListener('click', () => {
      isActive = !isActive;
      document.getElementById('annotate-toggle').classList.toggle('active', isActive);
      document.body.classList.toggle('annotate-mode', isActive);
      highlightOverlay.style.display = 'none';
    });

    // Hover highlight
    let currentTarget = null;
    document.addEventListener('mousemove', (e) => {
      if (!isActive) return;
      if (e.target.closest('#annotate-toolbar') || e.target.closest('#annotate-popup')) return;
      
      currentTarget = e.target;
      const rect = e.target.getBoundingClientRect();
      highlightOverlay.style.display = 'block';
      highlightOverlay.style.left = rect.left + 'px';
      highlightOverlay.style.top = rect.top + 'px';
      highlightOverlay.style.width = rect.width + 'px';
      highlightOverlay.style.height = rect.height + 'px';
    });

    // Click to annotate
    document.addEventListener('click', (e) => {
      if (!isActive) return;
      if (e.target.closest('#annotate-toolbar') || e.target.closest('#annotate-popup')) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const target = e.target;
      const rect = target.getBoundingClientRect();
      const popup = document.getElementById('annotate-popup');
      
      document.getElementById('annotate-popup-path').textContent = getSelector(target);
      document.getElementById('annotate-comment').value = '';
      
      popup.style.display = 'block';
      popup.style.left = Math.min(rect.right + 10, window.innerWidth - 300) + 'px';
      popup.style.top = Math.max(rect.top, 10) + 'px';
      popup.dataset.target = getSelector(target);
      
      document.getElementById('annotate-comment').focus();
    }, true);

    // Cancel
    document.getElementById('annotate-cancel').addEventListener('click', () => {
      document.getElementById('annotate-popup').style.display = 'none';
    });

    // Submit
    document.getElementById('annotate-submit').addEventListener('click', () => {
      const comment = document.getElementById('annotate-comment').value.trim();
      if (!comment) return;
      
      const selector = document.getElementById('annotate-popup').dataset.target;
      const element = document.querySelector(selector) || currentTarget;
      
      sendAnnotation(element, comment);
      document.getElementById('annotate-popup').style.display = 'none';
    });

    // Escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.getElementById('annotate-popup').style.display = 'none';
        if (isActive) {
          isActive = false;
          document.getElementById('annotate-toggle').classList.remove('active');
          document.body.classList.remove('annotate-mode');
          highlightOverlay.style.display = 'none';
        }
      }
    });

    console.log('[Annotate] Ready. Click the button in the bottom-right to start.');
  }

  // Go
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
