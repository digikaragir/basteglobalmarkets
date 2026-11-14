import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './hooks/useInstallPrompt'; // attach install listeners before React mounts
import { registerSW } from './utils/registerSW';
import { initCtaTracking } from './utils/track';
import './styles/global.css';
import './styles/motion.css';

registerSW();
initCtaTracking();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
