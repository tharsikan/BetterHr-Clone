
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("BetterHR: index.tsx mounting started");

const rootElement = document.getElementById('root');
const sanityCheck = document.getElementById('sanity-check');

if (!rootElement) {
  console.error("BetterHR: Critical - Root element missing");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Hide splash as soon as React takes over
    if (sanityCheck) {
      // Use a small delay only for visual smoothness, but don't wait for internal App states
      requestAnimationFrame(() => {
        setTimeout(() => {
          sanityCheck.classList.add('fade-out');
          console.log("BetterHR: Interface ready.");
        }, 300);
      });
    }
  } catch (err) {
    console.error("BetterHR: Failed to initialize React", err);
    if (sanityCheck) {
      sanityCheck.style.background = '#ef4444';
      sanityCheck.innerHTML = `<div style="padding:20px; color:white; text-align:center;"><h1>Crash Detected</h1><p>${err instanceof Error ? err.message : 'Unknown Error'}</p></div>`;
    }
  }
}
