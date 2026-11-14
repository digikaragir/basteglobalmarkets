import { useSyncExternalStore } from 'react';

/**
 * "Install app" support.
 *
 * Chrome / Edge / Samsung Internet (Android + desktop) fire `beforeinstallprompt`
 * when the site is installable; we keep that event and show our own Install
 * button. iPhone/iPad Safari has no such event, so for iOS we show a short
 * "Share → Add to Home Screen" guide instead.
 *
 * The listeners are attached at module load (this file is imported from
 * main.jsx) so the event is never missed before React mounts.
 */
let deferredPrompt = null;
let installed = false;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true);

const isIOS = () =>
  typeof navigator !== 'undefined' &&
  (/iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // we show our own button instead of the mini-infobar
    deferredPrompt = e;
    emit();
  });
  window.addEventListener('appinstalled', () => {
    installed = true;
    deferredPrompt = null;
    emit();
  });
}

let snapshot = null;
function getSnapshot() {
  const next = {
    canPrompt: !!deferredPrompt,
    iosGuide: isIOS() && !isStandalone(),
    installed: installed || isStandalone(),
  };
  if (!snapshot || snapshot.canPrompt !== next.canPrompt || snapshot.iosGuide !== next.iosGuide || snapshot.installed !== next.installed) {
    snapshot = next;
  }
  return snapshot;
}
const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const serverSnapshot = { canPrompt: false, iosGuide: false, installed: false };

export async function promptInstall() {
  if (!deferredPrompt) return 'unavailable';
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null; // a prompt can only be used once
  emit();
  return outcome; // 'accepted' | 'dismissed'
}

export function useInstallPrompt() {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
