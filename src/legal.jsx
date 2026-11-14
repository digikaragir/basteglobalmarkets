// Entry for the legal pages (disclaimer/, privacy/, terms/). Each HTML file sets data-page on #root.
import React from 'react';
import ReactDOM from 'react-dom/client';
import LegalPage from './components/legal/LegalPage';
import './hooks/useInstallPrompt';
import { registerSW } from './utils/registerSW';
import { initCtaTracking } from './utils/track';
import './styles/global.css';
import './styles/motion.css';

registerSW();
initCtaTracking();

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <LegalPage page={root.dataset.page} />
  </React.StrictMode>
);
