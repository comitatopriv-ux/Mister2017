import React from 'react';
import ReactDOM from 'react-dom/client';

// === overlay error semplice ===
function showFatal(err: any) {
  const pre = document.createElement('pre');
  pre.style.position = 'fixed';
  pre.style.inset = '0';
  pre.style.background = 'black';
  pre.style.color = 'lime';
  pre.style.font = '12px/1.4 monospace';
  pre.style.padding = '16px';
  pre.style.whiteSpace = 'pre-wrap';
  pre.style.zIndex = '99999';
  pre.textContent = String(
    (err && (err.stack || err.message)) || err || 'Unknown error'
  );
  document.body.innerHTML = '';
  document.body.appendChild(pre);
}

// Global handlers
window.addEventListener('error', (e) => showFatal(e.error || e.message));
window.addEventListener('unhandledrejection', (e) => showFatal(e.reason));

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}
const root = ReactDOM.createRoot(rootElement);

// === dynamic import + try/catch: cattura errori dei moduli all’avvio ===
(async () => {
  try {
    const [{ default: App }, { AppProvider }] = await Promise.all([
      import('./App'),
      import('./context/AppContext'),
    ]);

    const ErrorBoundary = (await import('./components/common/ErrorBoundary')).default;

    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <AppProvider>
            <App />
          </AppProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    showFatal(err);
  }
})();
