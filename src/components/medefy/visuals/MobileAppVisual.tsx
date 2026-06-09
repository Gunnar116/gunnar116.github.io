export function MobileAppVisual() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="mb-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dy="5" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.14" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Phone 1 — member home */}
      <g filter="url(#mb-shadow)" transform="translate(76 14)">
        <rect width="100" height="192" rx="18" fill="#FFFFFF" />
        <rect x="40" y="8" width="20" height="4" rx="2" fill="#E5EBE5" />
        <rect x="12" y="22" width="40" height="4" rx="2" fill="#9CB1A2" />
        <rect x="12" y="30" width="64" height="8" rx="3" fill="#2A3F33" />

        <rect x="12" y="46" width="76" height="36" rx="8" fill="#F0F5F0" />
        <rect x="18" y="52" width="30" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="18" y="60" width="48" height="6" rx="2" fill="#2A3F33" />
        <rect x="18" y="70" width="36" height="3" rx="1.5" fill="#C5D2C8" />

        <rect x="12" y="88" width="76" height="14" rx="4" fill="#F6F8F6" />
        <rect x="18" y="93" width="34" height="4" rx="2" fill="#2A3F33" />
        <rect x="76" y="94" width="6" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="12" y="106" width="76" height="14" rx="4" fill="#F6F8F6" />
        <rect x="18" y="111" width="40" height="4" rx="2" fill="#2A3F33" />
        <rect x="76" y="112" width="6" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="12" y="124" width="76" height="14" rx="4" fill="#F6F8F6" />
        <rect x="18" y="129" width="30" height="4" rx="2" fill="#2A3F33" />
        <rect x="76" y="130" width="6" height="3" rx="1.5" fill="#9CB1A2" />

        <rect x="0" y="160" width="100" height="32" fill="#F6F8F6" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${10 + i * 22} 170)`}>
            <circle cx="6" cy="6" r="3" fill={i === 0 ? '#2A3F33' : '#C5D2C8'} />
            <rect x="0" y="14" width="12" height="2" rx="1" fill={i === 0 ? '#2A3F33' : '#C5D2C8'} />
          </g>
        ))}
        <rect x="32" y="184" width="36" height="3" rx="1.5" fill="#E5EBE5" />
      </g>

      {/* Phone 2 — claims / benefits detail */}
      <g filter="url(#mb-shadow)" transform="translate(192 30)">
        <rect width="100" height="176" rx="18" fill="#FFFFFF" />
        <rect x="40" y="8" width="20" height="4" rx="2" fill="#E5EBE5" />
        <circle cx="20" cy="22" r="4" fill="#E5EBE5" />
        <rect x="32" y="20" width="40" height="4" rx="2" fill="#2A3F33" />

        <rect x="12" y="34" width="76" height="64" rx="8" fill="#2A3F33" />
        <rect x="18" y="42" width="28" height="3" rx="1.5" fill="#6A8478" />
        <rect x="18" y="50" width="50" height="7" rx="2" fill="#FFFFFF" />
        <rect x="18" y="62" width="40" height="3" rx="1.5" fill="#9FB6A8" />

        <rect x="18" y="76" width="32" height="16" rx="4" fill="#3E5A4B" />
        <rect x="22" y="80" width="14" height="2" rx="1" fill="#9FB6A8" />
        <rect x="22" y="85" width="20" height="3" rx="1.5" fill="#FFFFFF" />

        <rect x="54" y="76" width="32" height="16" rx="4" fill="#3E5A4B" />
        <rect x="58" y="80" width="14" height="2" rx="1" fill="#9FB6A8" />
        <rect x="58" y="85" width="20" height="3" rx="1.5" fill="#FFFFFF" />

        <rect x="12" y="106" width="76" height="14" rx="4" fill="#F0F5F0" />
        <circle cx="20" cy="113" r="3" fill="#5C8A75" />
        <rect x="28" y="111" width="44" height="3" rx="1.5" fill="#2A3F33" />
        <rect x="12" y="124" width="76" height="14" rx="4" fill="#F0F5F0" />
        <circle cx="20" cy="131" r="3" fill="#5C8A75" />
        <rect x="28" y="129" width="40" height="3" rx="1.5" fill="#2A3F33" />
        <rect x="12" y="142" width="76" height="14" rx="4" fill="#F0F5F0" />
        <circle cx="20" cy="149" r="3" fill="#5C8A75" />
        <rect x="28" y="147" width="48" height="3" rx="1.5" fill="#2A3F33" />

        <rect x="32" y="168" width="36" height="3" rx="1.5" fill="#E5EBE5" />
      </g>
    </svg>
  )
}
