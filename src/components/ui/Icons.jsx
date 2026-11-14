const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const WhatsAppIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 21l1.65-3.8A9 9 0 1 1 8.4 20.3L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const ArrowUpRight = (p) => (
  <svg {...base} width={12} height={12} {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);


export const CheckIcon = (p) => (
  <svg {...base} width={16} height={16} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const MenuIcon = (p) => (
  <svg {...base} width={22} height={22} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg {...base} width={22} height={22} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const DownloadIcon = (p) => (
  <svg {...base} width={16} height={16} {...p}>
    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
  </svg>
);

export const PlusIcon = (p) => (
  <svg {...base} width={18} height={18} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// iOS "Share" glyph (box with up arrow), used in the Add-to-Home-Screen guide
export const ShareIcon = (p) => (
  <svg {...base} width={18} height={18} {...p}>
    <path d="M12 3v12M8 7l4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" />
  </svg>
);

export const AddBoxIcon = (p) => (
  <svg {...base} width={18} height={18} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);
