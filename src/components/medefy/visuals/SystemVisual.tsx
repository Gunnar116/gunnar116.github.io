export function SystemVisual() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="sy-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dy="4" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.10" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#sy-shadow)" transform="translate(24 16)">
        <rect width="312" height="188" rx="12" fill="#FFFFFF" />

        {/* Header */}
        <rect x="16" y="14" width="60" height="4" rx="2" fill="#9CB1A2" />
        <rect x="16" y="22" width="120" height="8" rx="3" fill="#2A3F33" />
        <line x1="16" y1="42" x2="296" y2="42" stroke="#E5EBE5" />

        {/* Section: Buttons */}
        <rect x="16" y="54" width="36" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="16" y="64" width="56" height="20" rx="10" fill="#2A3F33" />
        <rect x="24" y="71" width="40" height="6" rx="2" fill="#F0F5F0" />
        <rect x="80" y="64" width="56" height="20" rx="10" fill="#FFFFFF" stroke="#D9E0DB" />
        <rect x="88" y="71" width="40" height="6" rx="2" fill="#2A3F33" />
        <rect x="144" y="68" width="40" height="12" rx="6" fill="#F0F5F0" />
        <rect x="148" y="72" width="32" height="4" rx="2" fill="#5C8A75" />

        {/* Section: Inputs */}
        <rect x="16" y="98" width="36" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="16" y="108" width="120" height="18" rx="5" fill="#FFFFFF" stroke="#D9E0DB" />
        <rect x="24" y="115" width="50" height="4" rx="2" fill="#C5D2C8" />
        <rect x="142" y="108" width="58" height="18" rx="5" fill="#FFFFFF" stroke="#D9E0DB" />
        <rect x="148" y="113" width="22" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="148" y="119" width="34" height="4" rx="2" fill="#2A3F33" />

        {/* Section: Color tokens */}
        <rect x="16" y="138" width="40" height="3" rx="1.5" fill="#9CB1A2" />
        <g transform="translate(16 148)">
          {[
            { f: '#2A3F33' },
            { f: '#5C8A75' },
            { f: '#9CB1A2' },
            { f: '#C5D2C8' },
            { f: '#F0F5F0' },
          ].map((c, i) => (
            <g key={i} transform={`translate(${i * 28} 0)`}>
              <rect width="22" height="22" rx="6" fill={c.f} stroke="#E5EBE5" />
              <rect x="0" y="26" width="22" height="2" rx="1" fill="#C5D2C8" />
            </g>
          ))}
        </g>

        {/* Right column — sample card */}
        <rect x="212" y="54" width="84" height="120" rx="8" fill="#F6F8F6" />
        <rect x="220" y="62" width="34" height="3" rx="1.5" fill="#9CB1A2" />
        <rect x="220" y="70" width="50" height="6" rx="2" fill="#2A3F33" />
        <rect x="220" y="84" width="68" height="3" rx="1.5" fill="#C5D2C8" />
        <rect x="220" y="92" width="60" height="3" rx="1.5" fill="#C5D2C8" />
        <rect x="220" y="100" width="64" height="3" rx="1.5" fill="#C5D2C8" />
        <rect x="220" y="116" width="68" height="20" rx="6" fill="#FFFFFF" stroke="#D9E0DB" />
        <circle cx="232" cy="126" r="5" fill="#C5D2C8" />
        <rect x="242" y="122" width="38" height="3" rx="1.5" fill="#2A3F33" />
        <rect x="242" y="129" width="28" height="2.5" rx="1.25" fill="#9CB1A2" />
        <rect x="220" y="146" width="68" height="20" rx="6" fill="#2A3F33" />
        <rect x="232" y="153" width="44" height="6" rx="2" fill="#F0F5F0" />
      </g>
    </svg>
  )
}
