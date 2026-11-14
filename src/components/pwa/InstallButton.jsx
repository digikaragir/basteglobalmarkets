import { useEffect, useRef, useState } from 'react';
import { useInstallPrompt, promptInstall } from '../../hooks/useInstallPrompt';
import { track } from '../../utils/track';
import { DownloadIcon, ShareIcon, AddBoxIcon, CloseIcon } from '../ui/Icons';
import './InstallButton.css';

/** iPhone/iPad guide — Safari has no install prompt, so we explain the two taps. */
function IosGuide({ onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal?.();
    return () => dialog?.close?.();
  }, []);
  return (
    <dialog
      ref={ref}
      className="ios-guide"
      aria-labelledby="ios-guide-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()} // tap the backdrop to close
    >
      <div className="ios-guide__inner">
        <div className="ios-guide__head">
          <h2 id="ios-guide-title">Install on iPhone</h2>
          <button className="ios-guide__close" onClick={onClose} aria-label="Close">
            <CloseIcon width={20} height={20} />
          </button>
        </div>
        <ol className="ios-guide__steps">
          <li>
            <span className="ios-guide__icon"><ShareIcon /></span>
            <span>Tap <strong>Share</strong> in Safari’s toolbar</span>
          </li>
          <li>
            <span className="ios-guide__icon"><AddBoxIcon /></span>
            <span>Choose <strong>Add to Home Screen</strong>, then <strong>Add</strong></span>
          </li>
        </ol>
        <p className="ios-guide__note">The app opens full-screen from your home screen, like any other app.</p>
      </div>
    </dialog>
  );
}

/**
 * Renders only when installing is actually possible:
 *  - Android / desktop Chrome & Edge: opens the browser's install dialog
 *  - iPhone / iPad Safari: shows the Add-to-Home-Screen guide
 *  - Already installed (or unsupported browser): renders nothing
 *
 * variant: 'nav' | 'menu' | 'footer'
 */
export default function InstallButton({ variant = 'footer', onDone }) {
  const { canPrompt, iosGuide, installed } = useInstallPrompt();
  const [showGuide, setShowGuide] = useState(false);

  if (installed || (!canPrompt && !iosGuide)) return null;

  const onClick = async () => {
    track('install-click', { variant });
    if (canPrompt) {
      const outcome = await promptInstall();
      track('install-' + outcome, { variant });
      onDone?.();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button type="button" className={`install install--${variant}`} onClick={onClick}>
        <DownloadIcon aria-hidden="true" />
        <span>Install app</span>
      </button>
      {showGuide && (
        <IosGuide
          onClose={() => {
            setShowGuide(false);
            onDone?.();
          }}
        />
      )}
    </>
  );
}
